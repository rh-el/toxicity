"use client"
import { redirect } from "next/navigation"

import { useRouter } from 'next/navigation'
import { verifyToken } from "./utils/utils"
import Cookies from "js-cookie"

export default function Home() {

  const router = useRouter()
  const token =  Cookies.get('token')
  console.log(token)

  if (!token) {

    console.log("toktok")
    router.push('/login')
    
  } else {
    
    console.log('tok')

    // redirect('/login')

  }

    // verifyToken()


  return (
  <div>homepage</div>
    )
    
}
