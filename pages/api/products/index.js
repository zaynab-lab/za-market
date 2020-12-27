import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { body } = req;
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("productsManager")) {
            const createdProduct = new Product({
              name: body.name,
              brand: body.brand,
              category: body.category,
              subCategory: body.subCategory,
              initprice: body.initprice,
              price: body.price,
              measure: body.measure,
              description: body.description
            });
            await createdProduct.save().catch((err) => console.log(err));
            return res.status(200).end(JSON.stringify(createdProduct));
          }
          return res.status(400).end("invalid");
        });
      } catch (err) {
        return res.status(400).end(err);
      }
      break;
    case "GET":
      try {
        const products = await Product.find({}).exec();
        return res.status(200).end(JSON.stringify(products));
      } catch (err) {
        return res.status(200).end("invalid");
      }
    default:
      return res.status(200).end(JSON.stringify([]));
  }
};
