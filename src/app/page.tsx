"use client"

import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function Landing() {

  const router = useRouter()
  // const [isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    const checkToken = async () => {
      const token: string | undefined = Cookies.get('token')
      
      if (!token) {
        router.push('/auth/login')
        return
      }

      try {

        const response = await fetch('/api/token', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (!response.ok) {
          Cookies.remove('token')
          router.push('/auth/login')
          return
        }

        router.push('/main')

        // setIsLoading(false)
      } catch (error) {
        console.error('token verification error: ', error)
        router.push('/auth/login')
      }
    }

    checkToken()
  }, [router])
    
  return
    
}
