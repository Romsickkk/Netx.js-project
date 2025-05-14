import Link from "next/link";
import React from "react";

import SignUpForm from "@/features/auth/components/sign-up-form";
import { singInPath } from "@/paths";
import CardCompact from "@/ui/card-compact";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/lib/auth";
import { redirect } from "next/navigation";

async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/tickets");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
