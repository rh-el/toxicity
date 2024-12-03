// import "./globals.css";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Login() {
  return (
  <div className="flex items-center flex-col justify-center h-full">
      <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">weett</h1>
      <div className="card card-auth">
        <h2 className="font-semibold">Login</h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm pl-1">Email</h3>
          <Input type="email" className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 " placeholder="Enter your email address" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm pl-1">Password</h3>
          <Input type="email" className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 " placeholder="Enter your password" />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button className="bg-primary text-gray-200 font-normal">Continue</Button>
          <p className="text-sm">New here? <Link className="underline font-semibold" href="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
    )
    
}
