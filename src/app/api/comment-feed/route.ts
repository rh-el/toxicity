import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import dotenv from 'dotenv'
import { headers } from "next/headers";
dotenv.config()
  
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

export async function GET() {

    try {
        const headersList = await headers()
        const postId = headersList.get('post_id')
        const parsedPostId = parseInt(postId!)

        const commentFeed = await prisma.comments.findMany({
        where: {
            post_id : parsedPostId,
        },
        select: {
            id: true,
            content: true,
            users: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
        })
            return NextResponse.json(commentFeed);
    } catch (error) {
        console.error(error)
    }
}