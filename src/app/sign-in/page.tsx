import SignInForm from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, singUpPath } from "@/paths";
import CardCompact from "@/ui/card-compact";
import Link from "next/link";
import React from "react";

function SignInPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sing in to your account"
        className=" w-full max-w-[420px] animate-fade-in-form-top"
        content={<SignInForm />}
        footer={
          <div className="flex justify-between w-full">
            <Link
              className="text-sm text-muted-foreground underline"
              href={singUpPath()}
            >
              No account yet?
            </Link>

            <Link
              className="text-sm text-muted-foreground underline"
              href={passwordForgotPath()}
            >
              Forget Password?
            </Link>
          </div>
        }
      />
    </div>
  );
}

export default SignInPage;
