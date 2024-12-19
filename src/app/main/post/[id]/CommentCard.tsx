import Avatar from "boring-avatars";
import Link from "next/link";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
  };
}

type Props = {
  post: PostType;
};

const CommentCard = ({ post }: Props) => {
  const dynamicProfilePath = `../profile/${post.users?.id}`;

  return (
    <div className="comment-card card-post">
      <div className="relative min-w-12 min-h-12">
        <Avatar
          name={String(post.users.id)}
          size={50}
          colors={["#d7eaff", "#ff8580", "#9ba0ff", "#b2ffd8"]}
        />
      </div>
      <div className="flex flex-col gap-2 pb-3">
        <Link href={dynamicProfilePath}>
          <h1 className="font-semibold pt-2">{post.users.username}</h1>
        </Link>
        {post.content}
      </div>
    </div>
  );
};

export default CommentCard;
