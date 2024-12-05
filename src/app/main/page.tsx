"use client";

import { posts } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

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
              loader={() => imageLoader(post.users.avatar)}
              width={40}
              height={40}
              src={post.users.avatar}
              alt=""
              priority
              className="rounded-full"
            ></Image>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold pt-2">{post.users.username}</h1>
              {post.content} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nam nulla consequatur, earum nostrum corrupti nesciunt
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
