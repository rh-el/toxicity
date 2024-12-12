import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/actions/actions";

export async function POST(req: Request) {

    try {
        
        const body = await req.json()
        const token  = req.headers.get('authorization')?.split(' ')[1]   
        const userId = Number(verifyToken(token))

        const like = await prisma.likes.create({
            data: {
              post_id: body.post_id,
              user_id: userId
            },
        })

        return NextResponse.json({like});

        } catch (error) {
            console.error(error)
        }
}
