import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface CommentButton {
  id: bigint | number;
}

const CommentButton = ({ id }: CommentButton) => {
  const [commentCount, setCommentCount] = useState<number>();

  const getCommentCount = useCallback(async () => {
    const response = await fetch("/api/count-comments", {
      method: "GET",
      headers: {
        post_id: JSON.stringify(id),
      },
    });
    if (!response.ok) {
      throw new Error("Login error");
    }
    const data = await response.json();
    setCommentCount(data);
  }, [id]);

  useEffect(() => {
    getCommentCount();
  }, [getCommentCount]);

  return (
    <>
      <Link href={`/main/post/${id}`}>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V11.5C19 12.8978 19 13.5967 18.7716 14.1481C18.4672 14.8831 17.8831 15.4672 17.1481 15.7716C16.5967 16 15.8978 16 14.5 16C14.0114 16 13.7671 16 13.5405 16.0535C13.2383 16.1248 12.9569 16.2656 12.7185 16.4645C12.5397 16.6137 12.3931 16.8091 12.1 17.2L10.64 19.1467C10.4229 19.4362 10.3143 19.5809 10.1812 19.6327C10.0647 19.678 9.9353 19.678 9.8188 19.6327C9.6857 19.5809 9.5771 19.4362 9.36 19.1467L7.9 17.2C7.60685 16.8091 7.46028 16.6137 7.2815 16.4645C7.04312 16.2656 6.76169 16.1248 6.45951 16.0535C6.23287 16 5.98858 16 5.5 16C4.10218 16 3.40326 16 2.85195 15.7716C2.11687 15.4672 1.53284 14.8831 1.22836 14.1481C1 13.5967 1 12.8978 1 11.5V5.8Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <p className="pr-2">{commentCount}</p>
    </>
  );
};

export default CommentButton;
