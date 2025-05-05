"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

function RedirectToast() {
  const pathName = usePathname();
  useEffect(() => {
    async function showCoockieToast() {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    }

    showCoockieToast();
  }, [pathName]);
  return null;
}

export default RedirectToast;
