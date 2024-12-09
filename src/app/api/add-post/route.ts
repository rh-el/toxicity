import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import dotenv from 'dotenv'
import { headers } from "next/headers";
import { verifyToken } from "../token/route";


declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

dotenv.config()
  
export async function POST(req: Request) {


  try {
    const headersList = await headers()
    const token = headersList.get('Authorization');
    const formattedToken = token?.split(" ")[1]
    const userId = Number(verifyToken(formattedToken))

    const body = await req.json()

    const newPost = await prisma.posts.create({
      data: {
          user_id : userId,
          content: body.content
      },
    })
    return NextResponse.json({newPost});
    } catch (error) {
      console.error(error)
    }
}