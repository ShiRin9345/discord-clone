import React from "react";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";

interface PageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { serverId, channelId } = params;
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });
  if (!member || !channel) {
    redirect("/");
  }
  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader />
    </div>
  );
};
export default Page;
