import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

/*
## Hash Password
*/
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}
/*
## Compare Password
*/
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}
