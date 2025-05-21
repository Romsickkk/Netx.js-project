"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AccountTabs() {
  const pathName = usePathname();
  return (
    <Tabs value={pathName.split("/").at(-1)}>
      <TabsList className="flex gap-x-4">
        <TabsTrigger value="profile" asChild>
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default AccountTabs;
