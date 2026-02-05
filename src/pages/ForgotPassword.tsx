import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AuthCard from "@/components/auth/AuthCard";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0]?.message);
      return;
    }

    setLoading(true);
    
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );
    
    setLoading(false);

    if (resetError) {
      console.error("Reset password error:", resetError);
      // Don't reveal if email exists - always show neutral message
    }

    // Always show success message for security (don't reveal if email exists)
    setSubmitted(true);
    toast({
      title: "Check your email",
      description: "If an account exists, a reset link has been sent.",
    });
  };

  if (submitted) {
    return (
      <AuthCard
        title="Check Your Email"
        description="If an account exists with that email, we've sent a password reset link."
      >
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please check your inbox and click the link to reset your password.
              The link will expire in 60 minutes.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline font-medium"
            >
              try again
            </button>
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Your Password"
      description="Enter your registered email address. We'll send you a link to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
