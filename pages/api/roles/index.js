import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Role from "../../../models/role";

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
            const role = new Role({
              name: body.name
            });
            await role.save().catch((err) => console.log(err));
            return res.status(200).end(JSON.stringify(role));
          }
        });
      } catch (err) {
        return res.status(200).end("invalid");
      }
      break;
    case "GET":
      try {
        const role = await Role.find({});
        return res.status(200).end(JSON.stringify(role));
      } catch (err) {
        return res.status(200).end("invalid");
      }
    default:
      return res.status(200).end("invalid");
  }
};
