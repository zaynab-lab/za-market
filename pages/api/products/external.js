import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import fs from "fs";

dbConnection();

export default async (req, res) => {
  var obj = JSON.parse(fs.readFileSync("./public/js/Nuts.json", "utf8"));
  const { method } = req;
  if (method === "POST") {
    const { body } = req;
    const token = req.cookies.jwt;
    if (!token) return res.end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user.roles.includes("GM")) {
        await obj.map(async (item) => {
          const createdProduct = new Product({
            name: item.name,
            brand: item.brand,
            category: item.category,
            productcode: item.productcode,
            price: item.price,
            description: item.description,
            createdby: item.createdby,
            link: item.link
          });
          await createdProduct.save().catch((err) => console.log(err));
        });
        return res.status(200).end("done");
      }
      return res.status(400).end("invalid");
    });
  }
};
