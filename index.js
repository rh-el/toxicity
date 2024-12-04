import bcrypt from "bcryptjs";
import { cp } from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const isValidEmail = function (str) {
  var regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  if (regex.test(str)) {
    return true;
  } else {
    return false;
  }
};
// isValidEmail('som@eemail.om');

// const hashPassword = (password) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// };

// const myHashedPassword = hashPassword("test");

// const comparePasswords = async (userPassword, hashedPassword) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(userPassword, hashedPassword, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

const verifyToken = (token) => {
  dotenv.config()
	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
		if (err) {
      throw new Error ('invalid JWT')
		}
		return decoded
	  });
}

// verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA3LCJpYXQiOjE3MzMzMzY0NzYsImV4cCI6MTczMzUwOTI3Nn0.1nVoSIZHoNJoz_1CZnIoPVlW2xsvCnXUoW1EXDRaQrw')

// console.log(await comparePasswords('test', myHashedPassword))

// console.log(hashPassword("foakfopa"))
