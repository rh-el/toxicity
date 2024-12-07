import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import dotenv from 'dotenv'
import { NextRequest } from "next/server";
dotenv.config()
  
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

const getLastPostInfos = async () => {
    const lastPostQuery = await prisma.posts.findMany({
        select: {
            id: true,
            content: true,
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            id: 'desc'
        },
        take: 5
    })
    return lastPostQuery
}

const getPostInfos = async (id: number) => {
    const postQuery = await prisma.posts.findMany({
        select: {
            id: true,
            content: true,
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            }
        },
        where: {
            id: id
        }
    })
    return postQuery
}


export async function GET(req: NextRequest) {

    try {

        const id = Number(req.nextUrl.pathname.split('/').pop())

        if (id === 0) {

            const postInfos = await getLastPostInfos()
            return NextResponse.json({postInfos})

        }

        const postInfos = await getPostInfos(id)
        return NextResponse.json({postInfos});

    } catch (error) {

        console.error(error)

    }
}