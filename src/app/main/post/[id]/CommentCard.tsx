import Image from "next/image";


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

const CommentCard = ({ post }: Props) => {
  return (
    <div className="comment-card card-post">
      <div className="relative min-w-12 min-h-12">
        <Image
          height={50}
          width={50}
          src={post.users.avatar}
          alt=""
          priority
          className="rounded-full avatar"
          unoptimized
        ></Image>
      </div>
      <div className="flex flex-col gap-2 pb-3">
        <h1 className="font-semibold pt-2">{post.users.username}</h1>
        {post.content}
      </div>
    </div>
  );
};

export default CommentCard;
