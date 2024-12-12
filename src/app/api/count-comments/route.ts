import {NextResponse} from "next/server"
import dotenv from 'dotenv'
import { headers } from 'next/headers'
import prisma from "@/lib/db/prisma";
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
        const parsedId = parseInt(postId!)


        const commentCount = await prisma.comments.count({
        where: {
            post_id: parsedId
        }
        })
            return NextResponse.json(commentCount);
    } catch (error) {
        console.error(error)
    }
}