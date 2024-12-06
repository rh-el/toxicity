"use client";

import PostCard from "../../PostCard";
import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";

interface PostFocus {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

export default function PostFocus({ params }: { params: { id: string } }) {
  const [focusInfo, setFocusInfo] = useState<PostFocus>();

  const urlParams = useParams<{ id: string }>();
  const post_id = urlParams.id;

  const getPostInfo = async () => {
    const response = await fetch("/api/post", {
      method: "GET",
      headers: {
        post_id: "162",
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

  let post: PostFocus | undefined = undefined;
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

  return <>{post && <PostCard post={post} />}</>;
}
