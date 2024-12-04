"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isValidEmail, isValidUsernamePassword } from "../utils/utils";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      if (!isValidEmail(email) || !isValidUsernamePassword(password)) {
        setValidEmail(isValidEmail(email));
        setValidPassword(isValidUsernamePassword(password));
        throw new Error("Invalid login form");
      }

      setValidEmail(true);
      setValidPassword(true);

      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          email: email,
          password: password,
        },
      });
      if (!response.ok) {
        throw new Error("Registration error");
      }
      const data = await response.json();
      const token = data.token;
      Cookies.set("token", token);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-full">
      <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">weett</h1>
      <form onSubmit={handleSubmit} className="card card-auth">
        <h2 className="font-semibold">Login</h2>
        <div className="flex flex-col gap-2  w-full px-4">
          <h3 className="text-sm pl-1">Email</h3>
          <Input
            type="text"
            name="email"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex flex-col gap-2  w-full px-4">
          <h3 className="text-sm pl-1">Password</h3>
          <Input
            type="password"
            name="password"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button className="bg-primary text-gray-200 font-normal">
            Continue
          </Button>
          <p className="text-sm">
            New here?{" "}
            <Link className="underline font-semibold" href="/register">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
