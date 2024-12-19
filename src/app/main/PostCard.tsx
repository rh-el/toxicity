import Like from "./Like";
import CommentButton from "./CommentButton";
import Link from "next/link";
import Avatar from "boring-avatars";
import { usePathname } from "next/navigation";

interface PostType {
  id: bigint | number;
  content: string;
  users?: {
    id: bigint;
    username: string;
    avatar: string;
  };
  _count?: {
    likes: number;
    comments: number;
  };
}

type Props = {
  post: PostType;
};

const PostCard = ({ post }: Props) => {
  const pathname = usePathname();
  const dynamicProfilePath =
    pathname !== "/main"
      ? `profile/${post.users?.id}`
      : `main/profile/${post.users?.id}`;

  return (
    <div className="card card-post">
      <div className="relative min-w-12 min-h-12">
        <Avatar
          name={String(post?.users!.id)}
          size={50}
          colors={["#d7eaff", "#ff8580", "#9ba0ff", "#b2ffd8"]}
        />
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
  );
};

export default PostCard;
