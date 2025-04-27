import { LucideHouse } from "lucide-react";
import Link from "next/link";
import React from "react";

import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";

function Header() {
  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div className="flex items-center gap-x-1">
        <Button asChild variant={"ghost"}>
          <Link href={homePath()} className="text-lg font-bold">
            <LucideHouse style={{ width: "20px", height: "20px" }} />
            <h1 className="text-lg font-semibold">Ticket Bounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-x-1">
        <ThemeSwitcher />
        {/* <Button asChild variant={"outline"}> */}
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
        {/* </Button> */}
      </div>
    </nav>
  );
}

export default Header;
