import { useState } from "react";
import Image from "next/image";
import { posts } from "@prisma/client";
import CommentButton from "./CommentButton";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

interface PostType extends posts {
  users: { id: bigint; username: string; avatar: string };
}

type Props = {
  post: PostType;
};

const PostCard = ({ post }: Props) => {
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);

  const handleLike = async (postId: number) => {
    const response = await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({
        "post-id": postId,
      }),
    });
    if (!response.ok) {
      throw new Error("Login error");
    }
  };

  return (
    <div key={post.id} className="card card-post">
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
        {post.content} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nam nulla consequatur, earum nostrum corrupti nesciunt
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
          <CommentButton id={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
