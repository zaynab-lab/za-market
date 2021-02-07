import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;
  switch (method) {
    case "POST":
      try {
        const products = await Product.find().where("_id").in(body.ids).exec();
        return res.status(200).end(JSON.stringify(products));
      } catch (err) {
        return res.status(400).end(err);
      }
    default:
      return res.status(200).end(JSON.stringify([{ name: "no products" }]));
  }
};
