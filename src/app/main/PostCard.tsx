import { useEffect, useState } from "react";
import Image from "next/image";
import { posts } from "@prisma/client";
import Like from "./Like";
import Cookies from "js-cookie";
import CommentButton from "./CommentButton";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

type Props = {
    post: PostType
}

const PostCard = ( {post}: Props) => {

    return (
        <div className="card card-post">
            <Image
              loader={() => imageLoader(post.users.avatar)}
              height={50}
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
                <Like postId={post.id} />
                <CommentButton id={post.id} />
              </div>
            </div>
        </div>
    )
    

}

export default PostCard