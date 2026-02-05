 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
 };
 
 Deno.serve(async (req) => {
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { url } = await req.json();
 
     if (!url) {
       return new Response(
         JSON.stringify({ success: false, error: 'URL is required' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Validate URL is from allowed domains (botanical image sources)
     const allowedDomains = [
       'upload.wikimedia.org',
       'commons.wikimedia.org',
       'images.unsplash.com',
       'cdn.britannica.com',
       'www.plantsoftheworldonline.org',
     ];
 
     let parsedUrl: URL;
     try {
       parsedUrl = new URL(url);
     } catch {
       return new Response(
         JSON.stringify({ success: false, error: 'Invalid URL format' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     const isAllowed = allowedDomains.some(domain => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`));
     
     if (!isAllowed) {
       return new Response(
         JSON.stringify({ success: false, error: 'Domain not allowed' }),
         { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     console.log('Proxying image:', url);
 
     // Fetch the image with proper headers
     const imageResponse = await fetch(url, {
       headers: {
         'User-Agent': 'DravyaDeck Educational Platform (https://dravyadecks.lovable.app)',
         'Accept': 'image/*',
       },
     });
 
     if (!imageResponse.ok) {
       console.error('Failed to fetch image:', imageResponse.status, imageResponse.statusText);
       return new Response(
         JSON.stringify({ success: false, error: `Failed to fetch image: ${imageResponse.status}` }),
         { status: imageResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
     const imageBuffer = await imageResponse.arrayBuffer();
 
     // Return the image with CORS headers
     return new Response(imageBuffer, {
       headers: {
         ...corsHeaders,
         'Content-Type': contentType,
         'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
       },
     });
   } catch (error) {
     console.error('Error proxying image:', error);
     const errorMessage = error instanceof Error ? error.message : 'Failed to proxy image';
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });
