import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        
        const body = await req.json()
        const token  = req.headers.get('authorization')?.split(' ')[1]    
        const userIdFetch = await fetch('http://localhost:3000/api/token', {
            headers: {
                authorization: `Bearer ${token}`
            },
        })
        const userId = await userIdFetch.json()

        const like = await prisma.likes.deleteMany({
            where: {
              post_id: body.post_id,
              user_id: userId.tokenCheck
            },
        })

        return NextResponse.json({like});

        } catch (error) {
            console.error(error)
        }
}
