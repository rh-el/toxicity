import { verifyToken } from '@/app/actions/actions'
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";


export async function GET(req:NextRequest) {

    try {

        const paramId = Number(req.nextUrl.pathname.split('/').pop())
        const userId = paramId === 0 ? Number(verifyToken(req.headers.get('authorization')?.split(' ')[1])) : paramId

        if (!userId) {
            throw new Error('error while trying to verify token')
        }

        const [profileData, followerCount, followedId] = await prisma.$transaction([
            prisma.users.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    bio: true
                }
            }),
            prisma.followers.count({
                where: {
                    followed_id: userId
                }
            }),
            prisma.followers.findFirst({
                where: {
                    followed_id: paramId,
                    following_id: Number(verifyToken(req.headers.get('authorization')?.split(' ')[1]))
                },
                select: {
                    id: true
                }
            })
        ])

        const isFollowed = followedId ? true : false

        return NextResponse.json({profileData, followerCount, isFollowed});
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}