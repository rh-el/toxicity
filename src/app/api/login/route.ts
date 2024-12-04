import prisma from "@/lib/db/prisma";
import {NextResponse} from "next/server"
import { generateToken, comparePasswords } from "@/app/utils/utils";
import dotenv from 'dotenv'
import { headers } from 'next/headers'

dotenv.config()
  
declare global {
    interface BigInt {
        toJSON(): number;
    }
}
BigInt.prototype.toJSON = function () { return Number(this) }

export async function GET(req: Request) {

    try {
        const headersList = await headers()
        const email = headersList.get('email')
        const password = headersList.get('password')

        if (email && password) {
            const newLogin = await prisma.users.findUnique({
            where: {
                email : email
            },
            select: {
                password: true,
                id: true
            }
            })
            const hashedPassword = newLogin?.password
            const isPasswordValid = await comparePasswords(password, hashedPassword!)
            if (isPasswordValid && newLogin) {
                const token = generateToken(newLogin.id)
                return NextResponse.json({newLogin, token});
            }
        }
        } catch (error) {
        console.error(error)
    }
}
