import { verifyToken } from "../../token/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";


export async function GET(req:NextRequest) {

    try {

        const paramId = Number(req.nextUrl.pathname.split('/').pop())
    // const token  = req.headers.get('authorization')?.split(' ')[1]    
    // const userId = Number(verifyToken(token))

    const userId = paramId === 0 ? Number(verifyToken(req.headers.get('authorization')?.split(' ')[1])) : paramId
    console.log(userId)

    if (!userId) {
        throw new Error('error while trying to verify token')
    }

    const [profileData, followerCount] = await prisma.$transaction([
        prisma.users.findUnique({
            where: {
                id: userId
            },            
        }),
        prisma.followers.count({
            where: {
                followed_id: userId
            }
        })
    ])

    return NextResponse.json({profileData, followerCount});
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}