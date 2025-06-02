"use client";
import { LucideLoader, LucideTrash2 } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/ui/confirm-dialog";

import deleteComment from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

function CommentDeleteButton({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) => (
      <Button disabled={isPending} variant="outline" size="icon">
        {isPending ? (
          <LucideLoader className="animate-spin"></LucideLoader>
        ) : (
          <LucideTrash2 className="w-4 h-4" />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
}

export default CommentDeleteButton;
