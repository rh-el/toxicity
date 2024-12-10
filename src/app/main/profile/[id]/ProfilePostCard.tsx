import { useEffect, useState } from "react";
import Image from "next/image";
import Like from "../../Like";
import Cookies from "js-cookie";
import CommentButton from "../../CommentButton";

interface PostType {
  id: bigint | number;
  content: string;
  users?: {
    id: bigint;
    username: string;
    avatar: string;
  };
  _count?: {
    likes: number,
    comments: number
  }
}

type Props = {
    post: PostType 
    profileData: {
      username: string;
      avatar: string;
      bio: string;
    } | undefined
}

const ProfilePostCard = ( {post, profileData}: Props) => {
  console.log(profileData)
    return (
        <div className="card card-post">
          <div className="relative min-w-12 min-h-12">
            <Image
              height={50}
              width={50}
              src={profileData!.avatar}
              alt=""
              priority
              className="avatar rounded-full"
              unoptimized
              ></Image>
          </div>
          
            <div className="flex flex-col gap-2 flex-grow-0">
              <h1 className="font-semibold pt-2">{profileData?.username}</h1>
              {post.content}
              <div className="flex gap-2 py-2">
                <Like postId={post.id} />
                <CommentButton id={post.id} />
              </div>
            </div>
        </div>
    )
    

}

export default ProfilePostCard