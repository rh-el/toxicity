"use client"
import { redirect } from "next/navigation"

import { useRouter } from 'next/navigation'
import { verifyToken } from "./utils/utils"
import Cookies from "js-cookie"
import Home from "./home/page"

export default function Landing() {

  const router = useRouter()
  const token =  Cookies.get('token')
  console.log(token)

  if (!token) {

    console.log("toktok")
    // redirect("/auth/login")
    router.push('/auth/login')
    
  } else {
    
    console.log('tok')


  }

    // verifyToken()


  return (
    <div className="items-center h-full">
      <h3 className="font-quicksand font-bold text-3xl p-3">weett</h3>
      {/* <Home /> */}
    </div>
    )
    
}
