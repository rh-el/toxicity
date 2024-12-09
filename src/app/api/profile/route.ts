import { verifyToken } from "../token/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";


export async function GET(req:Request) {

    try {

    const token  = req.headers.get('authorization')?.split(' ')[1]    
    const userId = Number(verifyToken(token))

    if (!userId) {
        throw new Error('error while trying to verify token')
    }

    const profileData = await prisma.$transaction([
        prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                avatar: true,
                bio: true
            }
        }),
        prisma.followers.count({
            where: {
                followed_id: userId
            }
        })
    ])

    return NextResponse.json(profileData);
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}