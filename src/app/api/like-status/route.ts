import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from '@/app/actions/actions'

export async function GET(req: Request) {

    const postId = req.headers.get('post_id')
    const formattedPostId = parseInt(postId!)

    const token = req.headers.get("authorization")?.split(' ')[1]  
    const userId = verifyToken(token) as number

    try {

        const [ likeStatus, likeCount ] = await prisma.$transaction([
            prisma.likes.findMany({
                where: {
                    user_id: userId,
                    post_id: formattedPostId
                }
            }),
            prisma.likes.count({
                where: {
                    post_id: formattedPostId
                }
            })
        ])

        const isLikedByUser = likeStatus.length ? true : false

        // const likedPostsArr = likedPosts.map((post) => Number(post.post_id))

        return NextResponse.json({ 
            isLikedByUser: isLikedByUser, 
            likeCount: likeCount 
        });

        } catch (error) {
            console.error(error)
        }

    
}
