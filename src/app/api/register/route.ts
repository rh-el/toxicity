import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import { hashPassword } from "@/app/utils/utils";


declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

  
export async function POST(req: Request) {

  try {

    const body = await req.json()

    const hashedPassword = hashPassword(body.password)

    console.log(hashedPassword)

    const newUser = await prisma.users.create({
      data: {
          email : body.email,
          username : body.username,
          password : hashedPassword,
      },
    })
    return NextResponse.json(newUser);
    } catch (error) {
      console.error(error)
    }
}
