import { databaseManager } from "@/db";
import { Retweet } from "@prisma/client";

type RetweetData = Pick<Retweet, "userId" | "postId">;

export const createRetweet = async (retweetData: RetweetData): Promise<Retweet> => {
  const prisma = databaseManager.getInstance();
  const retweet = await prisma.like.create({
    data: retweetData
  })
  return retweet;
}
