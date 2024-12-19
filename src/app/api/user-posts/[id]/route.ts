import { verifyToken } from '@/app/actions/actions'
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";


export async function GET(req:NextRequest) {

    try {
 
    const paramId = Number(req.nextUrl.pathname.split('/').pop())
    const userId = paramId === 0 ? Number(verifyToken(req.headers.get('authorization')?.split(' ')[1])) : paramId
    if (!userId) {
        throw new Error('error while trying to verify token')
    }

    const [ userPosts, userInfos ] = await prisma.$transaction([
      prisma.posts.findMany({
          where: {
            user_id: userId
          },
          include: {
            _count: {
              select: { 
                likes: true, 
                comments: true 
              }
            }
          }
      }),
      prisma.users.findUnique({
        where: {
          id: userId
        },
        select: {
          bio: true,
          username: true
        }
      })
  ])

    return NextResponse.json({userPosts, userInfos});
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}