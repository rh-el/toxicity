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
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);

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
              height={0}
              width={50}
              src={post.users.avatar}
              alt=""
              priority
              className="rounded-full"
            ></Image>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold pt-2">{post.users.username}</h1>
              {post.content} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nam nulla consequatur, earum nostrum corrupti nesciunt
              <div className="flex gap-2 py-2">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9932 3.13581C8.9938 0.798402 5.65975 0.169642 3.15469 2.31001C0.64964 4.45038 0.29697 8.029 2.2642 10.5604C3.89982 12.6651 8.84977 17.1041 10.4721 18.5408C10.6536 18.7016 10.7444 18.7819 10.8502 18.8135C10.9426 18.8411 11.0437 18.8411 11.1361 18.8135C11.2419 18.7819 11.3327 18.7016 11.5142 18.5408C13.1365 17.1041 18.0865 12.6651 19.7221 10.5604C21.6893 8.029 21.3797 4.42787 18.8316 2.31001C16.2835 0.192162 12.9925 0.798402 10.9932 3.13581Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="pr-2">124</p>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V11.5C19 12.8978 19 13.5967 18.7716 14.1481C18.4672 14.8831 17.8831 15.4672 17.1481 15.7716C16.5967 16 15.8978 16 14.5 16C14.0114 16 13.7671 16 13.5405 16.0535C13.2383 16.1248 12.9569 16.2656 12.7185 16.4645C12.5397 16.6137 12.3931 16.8091 12.1 17.2L10.64 19.1467C10.4229 19.4362 10.3143 19.5809 10.1812 19.6327C10.0647 19.678 9.9353 19.678 9.8188 19.6327C9.6857 19.5809 9.5771 19.4362 9.36 19.1467L7.9 17.2C7.60685 16.8091 7.46028 16.6137 7.2815 16.4645C7.04312 16.2656 6.76169 16.1248 6.45951 16.0535C6.23287 16 5.98858 16 5.5 16C4.10218 16 3.40326 16 2.85195 15.7716C2.11687 15.4672 1.53284 14.8831 1.22836 14.1481C1 13.5967 1 12.8978 1 11.5V5.8Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="pr-2">123</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
