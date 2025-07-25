import { NextResponse } from "next/server";
import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { serverId } = await params;
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (e) {
    console.error("[SERVER_ID]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
