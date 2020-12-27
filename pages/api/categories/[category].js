import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

// import authenticate from "../middleware";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  const {
    query: { category }
  } = req;

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
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("GM")) {
            Category.deleteOne({ name: category }).exec();
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch (err) {
        return res.end(JSON.stringify([]));
      }
      break;
    case "PUT":
      try {
        const { body } = res;
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          console.log(body);

          if (user.roles.includes("GM")) {
            const selectedCategory = await Category.findOne({
              name: category
            }).exec();
            const selectedSubCategory = [...selectedCategory.subCategory];
            // selectedSubCategory.filter((obj) => obj !== body.subCategory);

            Category.findByIdAndUpdate(
              selectedCategory._id,
              selectedSubCategory,
              (err) => err && res.end("invalid")
            ).exec();

            return res.end("done");
          }

          return res.end("invalid");
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    default:
      return res.end(JSON.stringify([]));
  }
};
