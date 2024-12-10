"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { isValidEmail, isValidUsernamePassword } from "../../utils/utils";
import Cookies from "js-cookie";

export default function Register() {
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email"));
      const username = String(formData.get("username"));
      const password = String(formData.get("password"));

      if (
        !isValidEmail(email) ||
        !isValidUsernamePassword(username) ||
        !isValidUsernamePassword(password)
      ) {
        setValidEmail(isValidEmail(email));
        setValidUsername(isValidUsernamePassword(username));
        setValidPassword(isValidUsernamePassword(password));
        throw new Error("Invalid registration form");
      }

      setValidEmail(true);
      setValidUsername(true);
      setValidPassword(true);

      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
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

      <form onSubmit={handleSubmit} className="card card-auth gradient-border">
        <h2 className="font-semibold">Register</h2>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1 font-semibold">Email</h3>
          <Input
            type="text"
            name="email"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your email address"
          />
          <p className="pl-1 text-sm h-5">
            {!validEmail ? "Enter valid email address" : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1 font-semibold">Username</h3>
          <Input
            type="text"
            name="username"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your username"
          />
          <p className="pl-1 text-sm h-5">
            {!validUsername ? "Enter valid username (3 letters min)" : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full px-4">
          <h3 className="text-sm pl-1 font-semibold">Password</h3>
          <Input
            type="password"
            name="password"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your password"
          />
          <p className="pl-1 text-sm h-5">
            {!validPassword ? "Enter valid password (3 letters min)" : ""}
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            type="submit"
            className="bg-white/10 px-8 text-gray-800 border border-white font-semibold flex items-center justify-center py-1 rounded-md hover:bg-white/50 hover:border-transparent duration-200"
          >
            Continue
          </Button>
          <p className="text-sm">
            Already on Toxicity?{" "}
            <Link className="underline font-semibold" href="/auth/login">
              Sign in
            </Link>
          </p>
        </div>
      </form>

  );
}
