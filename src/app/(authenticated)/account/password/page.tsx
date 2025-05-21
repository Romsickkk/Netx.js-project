import React from "react";

import Heading from "@/ui/Heading";

import AccountTabs from "../_navigation/tabs";

function PasswordPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />
    </div>
  );
}

export default PasswordPage;
