"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { posts } from "@prisma/client";
import Like from "./Like";
import Cookies from "js-cookie";
import CommentButton from "./CommentButton";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

interface userType {
  username: string;
  avatar: string;
  bio: string;
}

const AddComment = () => {
  const [userData, setUserData] = useState<userType>([]);

  const getCommenterInfo = async () => {
    try {
      const response = await fetch(`/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error while fetching next post");
      }
      const data = await response.json();

      setUserData(data.profileData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommenterInfo();
  }, []);

  return (
    <div className=" card-post">
      <div className="flex gap-3 w-full">
        <div className="w-16">
          <Image
            loader={() => imageLoader(userData.avatar)}
            height={50}
            width={50}
            src={userData.avatar}
            alt=""
            priority
            className="rounded-full"
          ></Image>
        </div>
        <div className="flex flex-col gap-2 pb-3 w-full">
          <h1 className="font-semibold pt-2">{userData.username}</h1>
          <input
            type="text-area"
            placeholder="Enter your comment"
            className="bg-white/30 h-8 font-light p-1 text-sm text-start focus:ring-transparent focus:border focus:border-white placeholder-gray-400 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AddComment;
