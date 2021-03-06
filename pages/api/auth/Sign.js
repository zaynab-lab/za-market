import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";

// import twilio from "twilio";
import { codeGenerator, OTPGenerator } from "../../../util/codeGenerator";
import axios from "axios";

// const client = twilio(process.env.TWILIO_ACSID, process.env.TWILIO_AUTH_TOKEN);

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    try {
      if (body.phoneNumber.length === 7 || body.phoneNumber.length === 8) {
        const otp = OTPGenerator();
        const d = Date.now();
        const user = await User.findOne({
          number: body.phoneNumber
        }).exec();
        if (user) {
          const min = 2 - (d - user.date) / 60000;
          if (min < 2 && min > 0) {
            var mins = Math.ceil(min);
            return res.end(`retry Loging after ${mins} min.`);
          } else {
            await User.findByIdAndUpdate(
              user._id,
              {
                date: new Date(),
                otptimes: user.otptimes + 1,
                otp
              },
              (err) => console.log(err)
            ).exec();
          }
        } else {
          const createdUser = new User({
            number: body.phoneNumber,
            promoCode: codeGenerator(),
            otp,
            otptimes: 1
          });
          createdUser.save().catch((err) => console.log(err));
        }
        const receptor = "961" + body.phoneNumber;
        axios
          .get(
            process.env.SMS_URL +
              "to=" +
              receptor +
              "&message=https://za-market.com your activation code is: " +
              otp
          )
          .then((response) => {
            return response.data.REQUEST_RESULT === 200;
          });
        return res.end("done");
        // client.verify
        //   .services(process.env.VA_SID)
        //   .verifications.create({ to: receptor, channel: "sms" });
      } else {
        res.end("please, enter the phone number correctly");
      }
    } catch (err) {
      console.log(err);
      return res.end("system error");
    }
  }
  return res.end("system error");
};
