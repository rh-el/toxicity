// import "./globals.css";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
  <div className="flex items-center flex-col justify-center h-full">
      <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">weett</h1>
      <div className="card card-auth">
        <h2>Login</h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm pl-1">Email</h3>
          <Input type="email" className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 " placeholder="Enter your email address" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm pl-1">Password</h3>
          <Input type="email" className="bg-white/50 font-light text-sm focus:ring-transparent focus:border focus:border-white placeholder-gray-400 " placeholder="Enter your password" />
        </div>
        <Button className="bg-primary text-gray-200 font-normal">Continue</Button>
      </div>
    </div>
    )
    
}
