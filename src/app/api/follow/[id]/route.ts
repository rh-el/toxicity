import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from '@/app/actions/actions'

export async function POST(req: NextRequest) {

    try {
        
        const followedId = Number(req.nextUrl.pathname.split('/').pop())
        const followingId =  Number(verifyToken(req.headers.get('authorization')?.split(' ')[1]))

        const follow = await prisma.followers.create({
            data: {
              followed_id: followedId,
              following_id: followingId
            },
        })
        

        return NextResponse.json({follow});

        } catch (error) {
            console.error(error)
        }
}
