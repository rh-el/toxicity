"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import CommentFeed from "./CommentFeed";
import FocusedPost from "./FocusedPost";
import AddComment from "./AddComment";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

export default function PostFocus() {
  const [focusInfo, setFocusInfo] = useState<PostType>();
  const [reloads, setReloads] = useState<number>(0);

  const urlParams = useParams<{ id: string }>();
  const post_id = urlParams.id;

  const getPostInfo = useCallback(
    async () => {
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
    }, [post_id]) 

  useEffect(() => {
    getPostInfo();
  }, [getPostInfo]);

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
          <AddComment postId={focusInfo!.id!} setReloads={setReloads} />
          <CommentFeed postId={post_id} key={reloads} />
        </div>
      )}
    </>
  );
}
