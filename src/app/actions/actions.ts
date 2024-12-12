import jwt from 'jsonwebtoken'

type DecodedType = {
    id: number
}

export const verifyToken = (token: string | undefined): number | boolean | void | never => {
    if (token && process.env.TOKEN_SECRET) {
        
        try {

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedType;

            if (!decoded) {
                throw new Error('invalid token');
            }
            return decoded.id;

        } catch (error) {
            
            console.error(error)
        }
    } else {
        return false;
    }
}