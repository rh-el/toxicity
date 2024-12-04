import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"


declare global {
    interface BigInt {
        toJSON(): number;
    }
  }
  BigInt.prototype.toJSON = function () { return Number(this) }

  
export async function POST(req: Request) {

  try {
    const body = await req.json()
    const newUser = await prisma.users.create({
      data: {
          email : body.email,
          username : body.username,
          password : body.password,
      },
    })
    return NextResponse.json(newUser);
    } catch (error) {
      console.error(error)
    }

  }
