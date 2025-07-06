import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/ui/modeToggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="text-primary flex h-full w-full flex-col items-center space-y-4 py-3 dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto !h-[2px] !w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: { avatarBox: "h-[48px] w-[48px]" },
          }}
        />
      </div>
    </div>
  );
};
export default NavigationSidebar;
