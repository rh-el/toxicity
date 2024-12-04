"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent } from "react";

export default function Register() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const username = String(formData.get("username"));
    const password = String(formData.get("password"));

    const request = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    console.log(request);
  };

  return (
    <div className="flex items-center flex-col justify-center h-full">
      <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">weett</h1>
      <form onSubmit={handleSubmit} className="card card-auth">
        <h2 className="font-semibold">Register</h2>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1">Email</h3>
          <Input
            type="email"
            name="email"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1">Username</h3>
          <Input
            type="text"
            name="username"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1">Password</h3>
          <Input
            type="password"
            name="password"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            type="submit"
            className="bg-primary text-gray-200 font-normal"
          >
            Continue
          </Button>
          <p className="text-sm">
            Already on Weett?{" "}
            <Link className="underline font-semibold" href="/login">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
