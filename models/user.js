const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    number: { type: String, require: true },
    otp: { type: String, require: true },
    date: { type: Date, default: Date.now },
    otptimes: { type: Number },
    jwt: { type: String },
    amount: { type: Number, default: 5000 },
    roles: { type: [String], default: ["customer"] },
    mail: { type: String },
    addresses: [
      {
        content: { type: String },
        long: { type: Number },
        lat: { type: Number }
      }
    ],
    birth: { type: Date },
    messages: [
      {
        date: Date,
        content: String
      }
    ]
  },
  { collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
