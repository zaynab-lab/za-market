import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { body } = req;
    try {
      const user = await User.findOne({
        number: body.phoneNumber
      }).exec();
      await User.findByIdAndUpdate(
        user._id,
        {
          name: body.name,
          invitedBy: body.invitedBy,
          amount: body.invitedBy.length > 0 ? 10000 : 5000,
          qr: body.qr ? true : false
        },
        (err) => console.log(err)
      );
      if (body.invitedBy.length > 0) {
        const userInv = await User.findOne({
          promoCode: body.invitedBy
        }).exec();
        await User.findByIdAndUpdate(
          userInv._id,
          {
            amount: userInv.amount + 5000,
            invitations: userInv.invitations ? userInv.invitations + 1 : 1
          },
          (err) => console.log(err)
        );
      }
      res.status(200).end("done");
    } catch (err) {
      return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
    }
  }
};
