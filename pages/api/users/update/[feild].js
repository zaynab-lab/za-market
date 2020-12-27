import dbConnection from "../../../../util/dbConnection";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;
  const {
    query: { feild }
  } = req;
  switch (method) {
    case "PUT":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          //////////////////////update///////////
          switch (feild) {
            case "address":
              const newAddresses = [...user.addresses, { content: body.fadd }];
              User.findByIdAndUpdate(
                user._id,
                { addresses: newAddresses },
                (err) => {
                  return err && res.end("invalid");
                }
              ).exec();
              break;
            case "mail":
              User.findByIdAndUpdate(user._id, { mail: body.mail }, (err) => {
                return err && res.end("invalid");
              }).exec();
              break;
            case "name":
              User.findByIdAndUpdate(user._id, { name: body.name }, (err) => {
                return err && res.end("invalid");
              }).exec();
              break;
            default:
              return res.end("invalid");
          }
        });
        return res.end("done");
      } catch (err) {
        return res.end("invalid");
      }

    default:
      return res.end("invalid");
  }
};
