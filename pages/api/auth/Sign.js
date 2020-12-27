import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACSID, process.env.TWILIO_AUTH_TOKEN);

dbConnection();

const generateOTP = () => {
  var digits = "0123456789";
  var OTP = new Array(5)
    .fill()
    .map(() => digits[Math.floor(Math.random() * 10)])
    .reduce((a, b) => {
      return a + b;
    });
  return OTP;
};

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
        const param1 = generateOTP();
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
                otp: param1,
                date: new Date(),
                otptimes: user.otptimes + 1
              },
              (err) => console.log(err)
            );
          }
        } else {
          const createdUser = new User({
            number: body.phoneNumber,
            otp: param1,
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
