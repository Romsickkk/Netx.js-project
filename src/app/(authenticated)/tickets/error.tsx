"use client";

import Placeholder from "@/ui/Placeholder";

function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "Something wrong"} />;
}

export default Error;
