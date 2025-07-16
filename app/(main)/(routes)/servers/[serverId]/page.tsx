import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface ServerIdProps {
  params: {
    serverId: string;
  };
}

const Page = async ({ params }: ServerIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const { serverId } = await params;
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const initialChannel = server?.channels[0];
  if (!initialChannel) {
    return null;
  }
  redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
};
export default Page;
