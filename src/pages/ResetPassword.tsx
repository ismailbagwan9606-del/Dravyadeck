import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AuthCard from "@/components/auth/AuthCard";
import PasswordInput from "@/components/auth/PasswordInput";
import { Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a valid recovery session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      // Check URL for error or access_token
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error_description = hashParams.get("error_description");
      
      if (error_description) {
        setInvalidLink(true);
        return;
      }

      // If there's no session and no hash params indicating a recovery, show invalid link
      const type = hashParams.get("type");
      const access_token = hashParams.get("access_token");
      
      if (!session && !access_token && type !== "recovery") {
        // Give it a moment for auth state to settle
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (!retrySession) {
            setInvalidLink(true);
          }
        }, 1000);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "confirmPassword") fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      console.error("Update password error:", error);
      
      if (error.message.includes("expired") || error.message.includes("invalid")) {
        setInvalidLink(true);
      } else {
        toast({
          title: "Error",
          description: "Unable to update password. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    // Sign out after password reset (don't auto-login)
    await supabase.auth.signOut();
    
    setSuccess(true);
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });

    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  if (invalidLink) {
    return (
      <AuthCard
        title="Invalid or Expired Link"
        description="This password reset link is no longer valid."
      >
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              The link may have expired or already been used.
              Please request a new password reset link.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Link to="/forgot-password">
              <Button className="w-full">Request New Link</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard
        title="Password Updated"
        description="Your password has been updated successfully."
      >
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              You can now sign in with your new password.
              Redirecting to Sign In...
            </p>
          </div>

          <div className="pt-4">
            <Link to="/login">
              <Button className="w-full">Go to Sign In</Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create a New Password"
      description="Enter your new password below."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
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

export default ResetPassword;
