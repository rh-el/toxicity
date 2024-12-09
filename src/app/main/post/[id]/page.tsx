"use client";

import PostCard from "../../PostCard";
import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import CommentFeed from "../../CommentFeed/page";
import FocusedPost from "../../FocusedPost";
import AddComment from "../../AddComment";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

export default function PostFocus({ params }: { params: { id: string } }) {
  const [focusInfo, setFocusInfo] = useState<PostType>();

  const urlParams = useParams<{ id: string }>();
  const post_id = urlParams.id;

  const getPostInfo = async () => {
    const response = await fetch("/api/post", {
      method: "GET",
      headers: {
        post_id: post_id,
      },
    });
    if (!response.ok) {
      throw new Error("Login error");
    }
    const data = await response.json();
    setFocusInfo(data);
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  let post: PostType | undefined = undefined;
  if (focusInfo) {
    post = {
      id: focusInfo.id,
      content: focusInfo.content,
      users: {
        id: focusInfo.users.id,
        username: focusInfo.users.username,
        avatar: focusInfo.users.avatar,
      },
    };
  }

  return (
    <>
      {post && (
        <div className="flex flex-col gap-5">
          <FocusedPost post={post} />
          <AddComment />
          <CommentFeed postId={post_id} />
        </div>
      )}
    </>
  );
}
