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
  id: bigint;
  username: string;
  avatar: string;
}

type Props = {
  user: userType;
};

const AddComment = ({ user }: Props) => {
  return (
    <div className="comment-card card-post">
      <Image
        loader={() => imageLoader(user.avatar)}
        height={50}
        width={50}
        src={user.avatar}
        alt=""
        priority
        className="rounded-full"
      ></Image>
      <div className="flex flex-col gap-2 pb-3">
        <h1 className="font-semibold pt-2">{user.username}</h1>
      </div>
    </div>
  );
};

export default AddComment;
