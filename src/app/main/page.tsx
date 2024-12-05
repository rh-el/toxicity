"use client";

import { posts } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Post extends posts {
  users: { id: bigint; username: string; avatar: string };
}

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
        {postData?.map((post: Post) => (
          <div key={post.id} className="card card-post">
            <Image
              width={500}
              height={500}
              src={post.users.avatar}
              alt=""
            ></Image>
            {post.content}
          </div>
        ))}
      </div>
    </>
  );
}
