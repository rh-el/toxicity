"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isValidEmail, isValidUsernamePassword } from "../../utils/utils";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [ loginError, setLoginError ] = useState<boolean>(false)
  const router = useRouter()

  // env variables have to be accessed from server side
  // verifyToken needs TOKEN_SECRET to properly work
  // so this function call for verifify token validity has to be called from login/route
  // or make another special route only for this verification?


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

      // login()
      // all the logic below can be called from login-actions login function
      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          email: email,
          password: password,
        },
      });
      if (!response.ok) {
        setLoginError(true)
        throw new Error("Login error");
      }
      const data = await response.json();
      const token = data.token;
      Cookies.set("token", token);
      router.push('/main')

    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    
      <form onSubmit={handleSubmit} className="card card-auth h-full">
        <h2 className="font-semibold">Login</h2>
        <div className="flex flex-col gap-2  w-full px-4">
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
        <div className="flex flex-col gap-2  w-full px-4">
          <h3 className="text-sm pl-1 font-semibold">Password</h3>
          <Input
            type="password"
            name="password"
            className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 "
            placeholder="Enter your password"
          />
          <p className="pl-1 text-sm h-5">
            {!validPassword ? "Enter valid password" : ""}
          </p>
        </div>
          <p className="pl-1 text-md font-semibold h-5">{loginError ? "Invalid crenditals" : ""}</p>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button className="bg-white/10 px-8 text-gray-800 border border-white font-semibold flex items-center justify-center py-1 rounded-md hover:bg-white/50 hover:border-transparent duration-200">
            Continue
          </Button>
          <p className="text-sm">
            New here?{" "}
            <Link className="underline font-semibold" href="/auth/register">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    
  );
}
