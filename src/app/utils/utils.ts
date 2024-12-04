import bcrypt from 'bcryptjs'

export const isValidEmail = (str: string): boolean => {
    const regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    return regex.test(str)
}

export const isValidUsernamePassword = (str: string): boolean => {
    return str.length >= 3
}

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const comparePasswords = async (userPassword: string, hashedPassword: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
		bcrypt.compare(userPassword, hashedPassword, (err, result) => {
			if (err) {
				reject(err)
			} else {			
				resolve(result)
			}
		})
	})
}


// module.exports = { isValidEmail, isValidUsernamePassword, hashPassword }