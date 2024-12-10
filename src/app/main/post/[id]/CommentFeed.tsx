"use client";

import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

interface CommentFeed {
  postId: string;
}

export default function CommentFeed({ postId }: CommentFeed) {
  const [commentData, setCommentData] = useState<PostType[]>([]);

  const getCommentInfo = async () => {
    try {
      const response = await fetch(`/api/comment-feed`, {
        method: "GET",
        headers: {
          post_id: postId,
        },
      });
      if (!response.ok) {
        throw new Error("Error while fetching next post");
      }
      const data = await response.json();

      setCommentData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommentInfo();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {commentData.map((comment: PostType, index) => (
          <CommentCard key={index} post={comment} />
        ))}
      </div>
    </>
  );
}