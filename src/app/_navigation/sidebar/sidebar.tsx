"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { navitems } from "./constants";
import { SidebarItem } from "./sidebar-item";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/utils/get-active-path";
import { singInPath, singUpPath } from "@/paths";

function Sidebar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const { activeIndex } = getActivePath(
    pathName,
    navitems.map((item) => item.href),
    [singInPath(), singUpPath()]
  );

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  function handleToggle(open: boolean) {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  }

  if (status === "loading" || !session)
    return <div className="w-[78px] bg-secondary/20" />;

  return (
    <>
      <nav
        className={cn(
          "animate-sidebar-from-left",
          "h-screen border-r pt-24",
          isTransition && "duration-200",
          isOpen ? "md:w-69 w-[78px]" : "w-[78px]"
        )}
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={() => handleToggle(false)}
      >
        <div className="px-3 py-2">
          <nav className="space-y-2">
            {navitems.map((navItem, index) => (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                isActive={activeIndex === index}
                navItem={navItem}
              />
            ))}
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
