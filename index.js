import bcrypt from'bcryptjs'
import { cp } from 'fs';

const isValidEmail = function (str) {
    var regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    if (regex.test(str)) {
        return true;
    }
    else {
        return false;
    }
};
// isValidEmail('som@eemail.om');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const myHashedPassword = hashPassword('test')

const comparePasswords = async (userPassword, hashedPassword) => {
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

// console.log(await comparePasswords('test', myHashedPassword))

// console.log(hashPassword("foakfopa"))