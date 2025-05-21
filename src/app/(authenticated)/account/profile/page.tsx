import Heading from "@/ui/Heading";

import AccountTabs from "../_navigation/tabs";

function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile informatiot"
        tabs={<AccountTabs />}
      />
    </div>
  );
}

export default ProfilePage;
