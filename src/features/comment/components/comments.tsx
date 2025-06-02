"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PaginatedData } from "@/types/pagination";
import CardCompact from "@/ui/card-compact";

import getComments from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import CommentDeleteButton from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

function Comments({ ticketId, paginatedComments }: CommentsProps) {
  const queryKey = ["comments", ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lustPage) =>
        lustPage.metadata.hasNextPage ? lustPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  // const [comments, setComments] = useState(paginatedComments.list);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  // function handleMore() {
  //   fetchNextPage();
  //   // const morePaginatedComments = await getComments(ticketId, metadata.cursor);
  //   // const moreComments = morePaginatedComments.list;
  //   // setComments([...comments, ...moreComments]);
  //   // setMetadata(morePaginatedComments.metadata);
  // }

  const queryClient = useQueryClient();

  function handleDeleteComment() {
    queryClient.invalidateQueries({ queryKey });
    // setComments((prevComments) =>
    //   prevComments.filter((comment) => comment.id !== id)
    // );
  }

  function handleCreateComment() {
    queryClient.invalidateQueries({ queryKey });
    // if (!comment) return;
    // setComments((prevComments) => [comment, ...prevComments]);
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    return () => {};
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={
              comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []
            }
          />
        ))}
      </div>
      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-sm italic">No more comments.</p>
        )}
      </div>
      {/* <div className="flex flex-col justify-center ml-8">
        {hasNextPage && (
          <Button
            variant="ghost"
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div> */}
    </>
  );
}

export default Comments;
