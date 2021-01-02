import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

// import authenticate from "../middleware";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  const {
    query: { category, subCategory }
  } = req;
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user.roles.includes("GM")) {
      switch (method) {
        case "GET":
          try {
            const selectedcategory = await Category.findOne({
              name: category
            }).exec();
            return res.end(JSON.stringify(selectedcategory.subCategory));
          } catch (err) {
            return res.end(JSON.stringify([]));
          }

        case "DELETE":
          try {
            Category.deleteOne({ name: category }).exec();
            return res.end("done");
          } catch (err) {
            return res.end(JSON.stringify([]));
          }
        case "PUT":
          try {
            const selectedCategory = await Category.findOne({
              name: category
            }).exec();
            const newsub = selectedCategory.subCategory.filter(
              (sub) => sub !== subCategory
            );
            Category.findByIdAndUpdate(
              selectedCategory._id,
              { subCategory: newsub },
              (err) => err && res.end("invalid")
            ).exec();

            return res.end("done");
          } catch (err) {
            return res.end("invalid");
          }
        default:
          return res.end(JSON.stringify([]));
      }
    }

    return res.end("invalid");
  });
};
