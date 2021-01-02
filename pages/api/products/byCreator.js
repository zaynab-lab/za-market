import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const {
    query: { code }
  } = req;
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    switch (method) {
      case "GET":
        try {
          if (user.roles.includes("GM") && code) {
            const products = await Product.find({
              createdby: code
            }).exec();
            return res.status(200).end(JSON.stringify(products.length));
          } else {
            const products = await Product.find({
              createdby: user.promoCode
            }).exec();
            return res.status(200).end(JSON.stringify(products.length));
          }
        } catch (err) {
          return res.end("invalid");
        }
      default:
        return res.end("invalid");
    }
  });
};
