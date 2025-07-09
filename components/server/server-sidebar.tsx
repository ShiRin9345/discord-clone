import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { ServerHeader } from "@/components/server/server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "@/components/server/server-search";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );

  if (!server) {
    redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;

  return (
    <div className="text-primary flex h-full w-full flex-col bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch />
        </div>
      </ScrollArea>
    </div>
  );
};
export default ServerSidebar;
