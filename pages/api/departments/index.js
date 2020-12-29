import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Department from "../../../models/department";

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
          if (user.roles.includes("GM")) {
            const department = new Department({
              name: body.name
            });
            await department.save().catch((err) => console.log(err));
            return res.status(200).end(JSON.stringify(department));
          }
        });
      } catch (err) {
        return res.status(200).end("invalid");
      }
      break;
    case "GET":
      try {
        const department = await Department.find({});
        return res.status(200).end(JSON.stringify(department));
      } catch (err) {
        return res.status(200).end("invalid");
      }
    default:
      return res.status(200).end("invalid");
  }
};
