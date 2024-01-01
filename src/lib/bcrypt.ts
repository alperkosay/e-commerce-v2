import bcrypt from "bcrypt"
const saltRounds = 10;

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds) as string;
};

const comparePassword = (enteredPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(enteredPassword, hashedPassword);
};

export { hashPassword, comparePassword };