import { ensureAuthUser } from "@/middlewares/authentication";
import { createRetweet } from "@/models/retweet";
import express from "express";

export const retweetRouter = express.Router();

retweetRouter.post("/:postId/retweets", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const currentUserId = req.authentication?.currentUserId;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }

  console.log(currentUserId, postId);

  await createRetweet({ userId: currentUserId, postId: Number(postId) });
  res.redirect(`/posts/${postId}`);
})
