import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";

import { codeGenerator, OTPGenerator } from "../../../util/codeGenerator";
import axios from "axios";

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
            return res.end(`Retry Loging after ${mins} min.`);
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
        await axios.get(
          process.env.SMS_URL +
            "to=" +
            receptor +
            "&message=your activation code is: " +
            otp +
            " https://za-market.com"
        );
        // .then((response) => {
        //   return response.data.REQUEST_RESULT === 200;
        // });
        return res.end("done");
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
