import mongoose from "mongoose";

const Saveaccounts = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum:["Device", "Online Service"],
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  websiteORdevice: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
})

const Save = mongoose.model("Save", Saveaccounts)
export default Save
