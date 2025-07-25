import { db } from "@/lib/db";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  let conversation = await findConversation(memberOneId, memberTwoId);
  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }
  return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return db.conversation.findFirst({
      where: {
        OR: [
          {
            memberOneId: memberOneId,
            memberTwoId: memberTwoId,
          },
          {
            memberOneId: memberTwoId,
            memberTwoId: memberOneId,
          },
        ],
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  try {
    return db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};
