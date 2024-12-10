import Image from "next/image";
import Like from "../../Like";
import CommentButton from "../../CommentButton";

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
  post: PostType;
};

const FocusedPost = ({ post }: Props) => {
  return (
    <div className="card card-post flex-col">
      <div className="flex gap-3">
        <div className="relative min-w-12 min-h-12">
          <Image
            height={50}
            width={50}
            src={post.users.avatar}
            alt=""
            priority
            className="avatar rounded-full"
            unoptimized
          ></Image>
        </div>
        
        <h1 className="font-semibold pt-2">{post.users.username}</h1>
      </div>
      <div className="flex flex-col gap-2">
        {post.content}
        <div className="flex gap-2 py-2">
          <Like postId={post.id} />
          <CommentButton id={post.id} />
        </div>
      </div>
    </div>
  );
};

export default FocusedPost;
