import Image from "next/image";
import Like from "./Like";
import CommentButton from "./CommentButton";
import Link from "next/link";

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
}

const PostCard = ( {post}: Props) => {

  const dynamicProfilePath = `main/profile/${post.users?.id}`


    return (
        <div className="card card-post">
          <div className="relative w-20 h-20  ">
            <Image
              height={50}
              width={50}
              src={post?.users!.avatar}
              alt="an avatar of a user"
              priority
              className="avatar rounded-full"
              unoptimized
            ></Image>
          </div>
            <div className="flex flex-col gap-2">
              <Link href={dynamicProfilePath}>
                <h1 className="font-semibold pt-2">{post?.users?.username}</h1>
              </Link>
              {post?.content}
              <div className="flex gap-2 py-2">
                <Like postId={post?.id} />
                <CommentButton id={post?.id} />
              </div>
            </div>
        </div>
    )
    

}

export default PostCard