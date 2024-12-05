import { useState } from "react"
import Image from "next/image"
import { posts } from "@prisma/client";

const imageLoader = (src: string, width?: number, quality?: number) => {
    return `${src}?w=${width}&q=${quality}`;
};



interface PostType extends posts {
    users: { id: bigint; username: string; avatar: string };
}

type Props = {
    post: PostType
}
  
const PostCard = ( {post}: Props) => {


    const [ isLikedByUser, setIsLikedByUser ] = useState<boolean>(false)
    
    const handleLike = async (postId: number) => {
        const response = await fetch('/api/like', {
            method: "POST",
            body: JSON.stringify({
                'post-id': postId
            })
        })
        if (!response.ok) {
            throw new Error("Login error");
        }
    }
    
    return (
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
            {/* <Like postId={post.id} handleLike={handleLike} likeStatus={likeStatus}/> */}
          </div>
    )
    

}

export default PostCard