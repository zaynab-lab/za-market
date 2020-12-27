import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        return res.end(JSON.stringify(categories));
      } catch (err) {
        return res.end(JSON.stringify([]));
      }
    case "POST":
      try {
        const token = req.cookies.jwt;
        const { body } = req;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("GM")) {
            const createdCategory = new Category({
              name: body.name,
              title: body.title
            });
            await createdCategory.save().catch((err) => console.log(err));
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch {
        return res.end(JSON.stringify([]));
      }
      break;
    default:
      return res.end(JSON.stringify([]));
  }
};
