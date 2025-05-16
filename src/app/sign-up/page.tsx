import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import SignUpForm from "@/features/auth/components/sign-up-form";
import { getAuth } from "@/features/auth/queries/get-auth";
import { singInPath, ticketsPath } from "@/paths";
import CardCompact from "@/ui/card-compact";

async function SignUpPage() {
  const session = await getAuth();

  if (session) {
    toast.error("Only sing up ussers can check tickets");
    redirect(ticketsPath());
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className=" w-full max-w-[420px] animate-fade-in-form-top"
        content={<SignUpForm />}
        footer={
          <Link
            className="text-sm text-muted-foreground underline"
            href={singInPath()}
          >
            Have an account? Sign In now
          </Link>
        }
      />
    </div>
  );
}

export default SignUpPage;
