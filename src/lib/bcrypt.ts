// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt"
const saltRounds = 10;

// Parolayı şifreleme
const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds) as string;
};

// Parola doğrulama
const comparePassword = (enteredPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(enteredPassword, hashedPassword);
};

export { hashPassword, comparePassword };