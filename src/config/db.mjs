import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../models/User.mjs"
import { hashPassword } from "../utils/password.mjs"

dotenv.config()

const MONGO_URL_CLASTER = process.env.MONGO_URL_CLASTER
const MONGO_URI_CAMPUSS = process.env.MONGO_URI_CAMPUSS

const connectDB = async () => {
  try {
    const conn = await mongoose.connect( MONGO_URL_CLASTER )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    await createSuperUser()
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB

export const createSuperUser = async () => {
  const fname = process.env.ADMIN_NAME
  const lname = process.env.ADMIN_NAME
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD

  try {
    const existingSuperAdmin = await User.findOne({ role: "superadmin" })
    if (existingSuperAdmin) {
      console.log("Super admin already exists")
      return
    }

   
    const hashedPassword = await hashPassword(superAdminPassword)

    const superAdmin = await User.create({

      emailAddress: superAdminEmail,
      password: hashedPassword,
      role: "superadmin",
    })

    console.log("Super admin account created:", superAdmin.emailAddress)
  } catch (error) {
    console.error("Failed to create super admin:", error.message)
  }
}
