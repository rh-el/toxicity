import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "../token/route";

export async function GET(req: Request) {

    // const body = await req.json()
    const postId = req.headers.get('post-id')
    const formattedPostId = parseInt(postId!)

    // const token = req.headers.get("authorization")?.split(' ')[1]  
    // const userId = verifyToken(token) as string
    // console.log(userId)
    // const formattedUserId = parseInt(userId)

    const userId = req.headers.get('authorization')?.split(' ')[1]
    const formattedUserId = parseInt(userId!)


    console.log(formattedPostId, formattedUserId)
    try {

        const likes = await prisma.likes.findMany({
            where: {
                post_id: formattedPostId,
                user_id: formattedUserId,
            }
        })

        if (likes.length) {
            return NextResponse.json({ postIsLike: true });
        }

        return NextResponse.json({ postIsLike: false });

        } catch (error) {
            console.error(error)
        }

    
}
