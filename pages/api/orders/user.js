import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          const orders = await Order.find({ userID: user._id }).exec();
          return user && res.end(JSON.stringify(orders));
        });
      } catch (err) {
        return res.end("invalid");
      }

      break;
    default:
      return res.end("invalid");
  }
};
