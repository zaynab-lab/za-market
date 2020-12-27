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
      User.findByIdAndUpdate(
        user._id,
        {
          name: body.name
        },
        (err) => console.log(err)
      );
      res.status(200).end("done");
    } catch (err) {
      return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
    }
  }
};
