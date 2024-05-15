import mongoose from "mongoose";

const Accountschema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,

  }
}) 
const Account = mongoose.model("Account", Accountschema);
export default Account