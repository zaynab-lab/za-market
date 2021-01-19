import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";

import twilio from "twilio";
import { codeGenerator } from "../../../util/codeGenerator";

const client = twilio(process.env.TWILIO_ACSID, process.env.TWILIO_AUTH_TOKEN);

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    try {
      if (
        body.phoneNumber.length === 7 ||
        body.phoneNumber.length === 8 ||
        body.phoneNumber.length === 10
      ) {
        const d = Date.now();
        const user = await User.findOne({
          number: body.phoneNumber
        }).exec();
        if (user) {
          const min = 2 - (d - user.date) / 60000;
          if (min < 2 && min > 0) {
            var mins = Math.ceil(min);
            return res.end(`لإعادة المحاولة، نرجو منك الإنتظار ${mins} دقيقة.`);
          } else {
            User.findByIdAndUpdate(
              user._id,
              {
                date: new Date(),
                otptimes: user.otptimes + 1
              },
              (err) => console.log(err)
            );
          }
        } else {
          const createdUser = new User({
            number: body.phoneNumber,
            promoCode: codeGenerator(),
            otptimes: 1
          });
          createdUser.save().catch((err) => console.log(err));
        }

        const receptor =
          body.phoneNumber.length === 10
            ? "+98" + body.phoneNumber
            : "+961" + body.phoneNumber;
        client.verify
          .services(process.env.VA_SID)
          .verifications.create({ to: receptor, channel: "sms" });
        setTimeout(
          () =>
            client.verify
              .services(process.env.VA_SID)
              .verificationChecks.create({
                to: receptor,
                code: 24
              }),
          4000
        );
        return res.end("done");
      } else {
        res.end("يرجى ادخال الرقم بالشكل الصحيح");
      }
    } catch (err) {
      return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
    }
  }
  return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
};
