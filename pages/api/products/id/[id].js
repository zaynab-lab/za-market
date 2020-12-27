import dbConnection from "../../../../util/dbConnection";
import Product from "../../../../models/product";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;
  const {
    query: { id }
  } = req;
  switch (method) {
    case "PUT":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("productsManager")) {
            //////////////////////update///////////
            if (!!body.exist === body.exist) {
              Product.findByIdAndUpdate(id, { exist: body.exist }, (err) => {
                return err && res.end("invalid");
              }).exec();
            } else if (!!body.appear === body.appear) {
              Product.findByIdAndUpdate(id, { appear: body.appear }, (err) => {
                return err && res.end("invalid");
              }).exec();
            } else {
              Product.findByIdAndUpdate(
                id,
                {
                  name: body.name,
                  brand: body.brand,
                  initprice: body.initprice,
                  price: body.price,
                  description: body.description,
                  measure: body.measure,
                  category: body.category,
                  subCategory: body.subCategory
                },
                (err) => {
                  return err && res.end("invalid");
                }
              ).exec();
            }
            return res.status(200).end("done");
          }
          return res.status(400).end("invalid");
        });
      } catch (err) {
        return res.status(400).end("invalid");
      }
      break;
    case "DELETE":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("GM")) {
            Product.findByIdAndRemove(id, (err) => {
              return err && res.end("invalid");
            });
          }
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    case "GET":
      try {
        const product = await Product.findById(id).exec();
        return res.end(JSON.stringify(product));
      } catch (err) {
        return res.end("invalid");
      }
    default:
      return res.end("invalid");
  }
};
