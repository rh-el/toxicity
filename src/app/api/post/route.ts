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
    const headersList = await headers()
    const post_id = headersList.get('post_id')
    const parsedId = parseInt(post_id!)

    try {
        const postInfo = await prisma.posts.findUnique({
            where: {
                id: parsedId
            },
            select: {
                id: true,
                content: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    },
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        updated_at: true,
                        users : {
                            select: {
                                id: true,
                                username: true,
                                avatar: true
                        }
                    }
                }
            }

        }
        })
            return NextResponse.json(postInfo);
    } catch (error) {
        console.error(error)
    }
}