"use client";

import PostCard from "./PostCard";
import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

interface PostFocus {
  id: bigint;
  setFocusMode: any;
  setFocusedPost: any;
}

export default function PostFocus({
  id,
  setFocusMode,
  setFocusedPost,
}: PostFocus) {
  const [focusInfo, setFocusInfo] = useState<PostType>();

  const post_id = JSON.stringify(id);

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
    <div className="background-blur">
      {post && (
        <PostCard
          post={post}
          setFocusMode={setFocusMode}
          setFocusedPost={setFocusedPost}
        />
      )}
    </div>
  );
}
