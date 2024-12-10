"use client";

import { FormEvent, useState } from "react";
import { useRef } from "react";
import PostCard from "../PostCard";

interface PostType {
  id: bigint;
  content: string;
  users: {
    id: bigint;
    username: string;
    avatar: string;
  };
}

const AddPost = () => {
  const inputField = useRef<any>();
  const [postData, setPostData] = useState<PostType[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const tag = String(formData.get("tag"));
      const response = await fetch(`/api/search/${tag}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Search error");
      }
      const data = await response.json();
      console.log(data);
      setPostData(data.matchedPosts);
      inputField.current.value = "";
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-3 w-full">
      <form onSubmit={handleSubmit} className="flex pt-1">
        <div className="bg-white/30 text-gray-800 font-semibold flex items-center justify-center px-2 py-1 w-10 rounded-l-md">
          #
        </div>
        <input
          name="tag"
          placeholder="Enter tag name"
          className="bg-white/30 w-full outline-none border-none font-light p-2 text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-white/30 text-gray-800 font-semibold flex items-center justify-center px-2 py-1 w-28 rounded-r-md"
        >
          Search
        </button>
      </form>
      {postData.map((post: PostType, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default AddPost;
