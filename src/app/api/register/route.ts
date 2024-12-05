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

    const hashedPassword = hashPassword(body.password)

    const newUser = await prisma.users.create({
      data: {
          email : body.email,
          username : body.username,
          password : hashedPassword,
      },
    })
    const token = generateToken(newUser.id)
    return NextResponse.json({newUser, token});
    } catch (error) {
      console.error(error)
    }
}
