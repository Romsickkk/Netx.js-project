import React from "react";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();
  return <>{children}</>;
}

export default AuthenticatedLayout;
