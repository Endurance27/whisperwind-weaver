import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

type AuthMode = "login" | "signup" | "forgot-password";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-analytics-blue to-analytics-purple relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center p-8">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">AI4InclusiveGh Analytics</h1>
            <p className="text-lg opacity-90">
              Empowering social change through data-driven insights and analytics for inclusion, 
              equality, and social justice in Ghana.
            </p>
          </div>
        </div>
        {/* Mock analytics cards overlay */}
        <div className="absolute top-8 right-8 space-y-4 opacity-30">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-48">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-analytics-green"></div>
              <span className="text-sm">Mental Health: 4,256</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-48">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-analytics-pink"></div>
              <span className="text-sm">VAW: 3,872</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-48">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-analytics-orange"></div>
              <span className="text-sm">LGBTQ+: 1,765</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        {mode === "login" && (
          <LoginForm
            onSwitchToSignup={() => setMode("signup")}
            onSwitchToForgotPassword={() => setMode("forgot-password")}
          />
        )}
        {mode === "signup" && (
          <SignupForm onSwitchToLogin={() => setMode("login")} />
        )}
        {mode === "forgot-password" && (
          <ForgotPasswordForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;