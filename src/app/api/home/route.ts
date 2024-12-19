import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import dotenv from 'dotenv'
dotenv.config()
  
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

export async function GET() {

    try {
        const homeFeed = await prisma.posts.findMany({
        select: {
            id: true,
            content: true,
            users: {
                select: {
                    id: true,
                    username: true
                }
            }

        }
        })
            return NextResponse.json({homeFeed});
    } catch (error) {
        console.error(error)
    }
}