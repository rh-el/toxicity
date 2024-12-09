"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const imageLoader = (src: string, width?: number, quality?: number) => {
  return `${src}?w=${width}&q=${quality}`;
};

interface userType {
  id: bigint;
  username: string;
  avatar: string;
  bio: string;
}

const AddPost = () => {
  const router = useRouter();
  const inputField = useRef<any>();
  const [userData, setUserData] = useState<userType>();

  const getUserInfo = async () => {
    try {
      const response = await fetch(`/api/profile/0`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error while fetching next post");
      }
      const data = await response.json();

      setUserData(data.profileData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const content = String(formData.get("content"));
      const response = await fetch("/api/add-post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          content: content,
        }),
      });
      if (!response.ok) {
        throw new Error("Registration error");
      }
      const data = await response.json();
      console.log(data);
      inputField.current.value = "";
      router.push("/main");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className="card-post">
      <div className="flex gap-3 w-full">
        <div className="w-16">
          {userData && (
            <Image
              loader={() => imageLoader(userData.avatar)}
              height={50}
              width={50}
              src={
                userData.avatar
                  ? userData.avatar
                  : "https://jwyjrgwkkaqapgjqjlbb.supabase.co/storage/v1/object/sign/avatars/avatar.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci53ZWJwIiwiaWF0IjoxNzMzMzk2Njk5LCJleHAiOjE3NjQ5MzI2OTl9.s_WGrL3Ej4z9-UW5dDkUHwZgAC6fpFdqVWXOpJhYaq0&t=2024-12-05T11%3A04%3A59.556Z"
              }
              alt=""
              priority
              className="rounded-full"
            ></Image>
          )}
        </div>
        <div className="flex flex-col gap-2 pb-3 w-full">
          <h1 className="font-semibold pt-2">
            {userData?.username && userData!.username}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea
              ref={inputField}
              rows={2}
              name="content"
              placeholder="What's up?"
              className="bg-white/30 flex-1 overflow-y-auto outline-none border-none font-light p-2 text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 rounded-t-md"
            />
            <button
              type="submit"
              className="bg-white/30 text-gray-800 font-semibold flex items-end h-6 justify-end px-2 py-1 w-full rounded-b-md"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
