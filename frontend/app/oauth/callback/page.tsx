"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { CircleNotch } from "@phosphor-icons/react";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { oauthLogin } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      oauthLogin(token);
      router.push("/dashboard");
    } else {
      router.push("/login?error=oauth_failed");
    }
  }, [searchParams, oauthLogin, router]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-sm glass-widget p-8 sm:p-10 rounded-[2.5rem] flex flex-col items-center">
        <CircleNotch size={48} className="text-fedin-green animate-spin mb-4" />
        <h2 className="text-xl font-bold text-fedin-dark">Authenticating</h2>
        <p className="text-sm text-fedin-dark/70 mt-2 text-center">
          Securely logging you into your account...
        </p>
      </div>
    </div>
  );
}
