import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Reset link sent!",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forget Password?</CardTitle>
        <CardDescription className="text-primary">
          Enter your email address below to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:underline"
          >
            Back to login
          </button>
        </p>
      </CardContent>
    </Card>
  );
}