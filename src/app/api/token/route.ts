import dotenv from 'dotenv'
import {NextResponse} from "next/server"
import { verifyToken } from '@/app/actions/actions'


dotenv.config()



export async function GET(req:Request) {

    try {

    const token  = req.headers.get('authorization')?.split(' ')[1]    
    const tokenCheck = verifyToken(token)

    if (!tokenCheck) {
        throw new Error('error while trying to verify token')
    }

    return NextResponse.json({tokenCheck});
    

    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}