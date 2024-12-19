import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

export async function GET(req:NextRequest) {

    try {

        const paramContent = `#${req.nextUrl.pathname.split('/').pop()}`

        const matchedPosts = await prisma.posts.findMany({
                where: {
                    content: {
                        contains: paramContent,
                    }
                },
                select: {
                    id: true,
                    content: true,
                    users: {
                        select: {
                            id: true,
                            username: true
                        }
                    },   
                }
        })

        // const isFollowed = followedId ? true : false

        return NextResponse.json({matchedPosts});
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}