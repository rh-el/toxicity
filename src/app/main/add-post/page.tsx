"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface userType {
  id: bigint;
  username: string;
  avatar: string;
  bio: string;
}

const AddPost = () => {
  const router = useRouter();
  const inputField = useRef<HTMLTextAreaElement>(null);
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
      await response.json();
      if (inputField.current) {
        inputField.current.value = "";

      }
      router.push("/main");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className="card-post">
      <div className="flex gap-3 w-full">
        <div className="relative min-w-12 min-h-12">
          {userData && (
            <Image
              height={50}
              width={50}
              src={userData.avatar}
              alt=""
              priority
              className="avatar rounded-full"
              unoptimized
            ></Image>
          )}
        </div>
        <div className="flex flex-col gap-2 pb-3 w-full">
          <h1 className="font-semibold pt-2">
            {userData?.username && userData!.username}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              ref={inputField}
              rows={2}
              name="content"
              placeholder="What's up?"
              className="bg-white/30 flex-1 overflow-y-auto outline-none border-none font-light p-2 text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 rounded-md"
            />
              <button
                type="submit"
                className="w-full bg-white/10 text-gray-800 border border-white font-semibold flex items-center justify-center px-2 py-1 rounded-md hover:bg-white/50 hover:border-transparent duration-200"
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
