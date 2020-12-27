import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const {
    query: { category }
  } = req;
  switch (method) {
    case "GET":
      try {
        const products = await Product.find({ category: category });
        return res.status(200).end(JSON.stringify(products));
      } catch (err) {
        return res.status(200).end(JSON.stringify([]));
      }
    default:
      return res.status(200).end(JSON.stringify([]));
  }
};
