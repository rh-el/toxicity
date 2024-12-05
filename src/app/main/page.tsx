"use client";

import { posts } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [postData, setPostData] = useState<[]>();

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
        {postData?.map((post: posts) => (
          <div key={post.id} className="card card-post">
            {post.content}
          </div>
        ))}
      </div>
    </>
  );
}
