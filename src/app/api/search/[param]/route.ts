import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { match } from "assert";

export async function GET(req:NextRequest) {

    try {

        const paramContent = `#${req.nextUrl.pathname.split('/').pop()}`

        console.log(paramContent)

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
                            username: true,
                            avatar: true
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