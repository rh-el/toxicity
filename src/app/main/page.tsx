"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

export default function Home() {
  const [postData, setPostData] = useState<PostType[]>();

  const getFeed = async () => {
    const response = await fetch("/api/home", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Login error");
    }
    const data = await response.json();
    setPostData(data.homeFeed);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {postData?.map((post: PostType, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </>
  );
}
