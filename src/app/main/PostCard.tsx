import { useEffect, useState } from "react";
import Image from "next/image";
import { posts } from "@prisma/client";
import Like from "./Like";
import Cookies from "js-cookie";
import CommentButton from "./CommentButton";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

interface PostType extends posts {
  users: { id: bigint; username: string; avatar: string };
}

type Props = {
    post: PostType
}

type LikeStatusType = {
  postIsLike: boolean;
  likeCount: number
}
  
const PostCard = ( {post}: Props) => {

    // const [ isLikedByUser, setIsLikedByUser ] = useState<boolean>(false)
    // const [ likeStatus, setLikeStatus ] = useState<LikeStatusType>({postIsLike: false, likeCount: 0})
    



    // const getLikeStatus = async (postId: bigint) => {
    //   const strId = String(postId)
    //     const response = await fetch('/api/like-status', {
    //     headers: {
    //       authorization: `Bearer ${Cookies.get('token')}`,
    //       post_id: strId
    //     }
    //     })
    //     const likeData = await response.json()
    //     // setLikeStatus(likeData)
    // }

    useEffect(() => {
      // getLikeStatus(post.id)
        // handleLike
    })




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