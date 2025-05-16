"use client";
import { LucideHouse, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath, singInPath, singUpPath, ticketsPath } from "@/paths";

function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const navItems = (
    <>
      <ThemeSwitcher />
      {session ? (
        <>
          <Link
            href={ticketsPath()}
            className={buttonVariants({ variant: "default" })}
          >
            Tickets
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: singInPath() })}
            variant="outline"
          >
            Log Out <LucideLogOut />
          </Button>
        </>
      ) : (
        <>
          <Link
            href={singUpPath()}
            className={buttonVariants({ variant: "outline" })}
          >
            Sing Up
          </Link>
          <Link
            href={singInPath()}
            className={buttonVariants({ variant: "default" })}
          >
            Sing In
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="animate-header-from-top  supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div className="flex items-center gap-x-1">
        <Button asChild variant={"ghost"}>
          <Link href={homePath()} className="text-lg font-bold">
            <LucideHouse style={{ width: "20px", height: "20px" }} />
            <h1 className="text-lg font-semibold">Ticket Bounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-x-1">{navItems}</div>
    </nav>
  );
}

export default Header;
