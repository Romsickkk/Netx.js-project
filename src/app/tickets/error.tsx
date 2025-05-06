"use client";

import Placeholder from "@/ui/placeholder";

function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "Something wrong"} />;
}

export default Error;
