import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import { hashPassword, generateToken } from "@/app/utils/utils";
import dotenv from 'dotenv'


declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

dotenv.config()
  
export async function POST(req: Request) {


  try {

    const body = await req.json()

    const newComment = await prisma.comments.create({
      data: {
          post_id : body.postId,
          user_id : body.userId,
          content: body.content
      },
    })
    return NextResponse.json({newComment});
    } catch (error) {
      console.error(error)
    }
}
