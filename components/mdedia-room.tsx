"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!user?.firstName || !user?.lastName) {
      return;
    }
    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const resp = await fetch(`/api/token?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);
  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
