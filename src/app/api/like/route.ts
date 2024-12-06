import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const body = await req.json()

    

    try {
        const user = await prisma.posts.findUnique({
            where: {
              id: body.id,
            },
        })

        // return NextResponse.json({likeData});

        } catch (error) {
            console.error(error)
        }

    
}
