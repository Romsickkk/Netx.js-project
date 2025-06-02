import { Comment } from "@/generated/prisma";

export type CommentWithUser = Comment & {
  user: {
    username: string;
  } | null;
};

export type CommentWithMetadata = CommentWithUser & {
  isOwner: boolean;
};
