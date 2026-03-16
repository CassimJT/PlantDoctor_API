import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin", "researcher", "user"], default: "user" },
}, { timestamps: true })

export default mongoose.model("User", userSchema)