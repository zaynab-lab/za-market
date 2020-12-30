import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import Permission from "../../../models/permission";
import jwt from "jsonwebtoken";

dbConnection();
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.length > 1) {
            const permissionsList = await Permission.find({
              roles: { $in: [...user.roles] }
            });
            const permissions = permissionsList.map((obj) => obj.permission);
            if (permissions.includes("view users")) {
              const users = await User.find({});
              return await res.status(200).end(JSON.stringify(users));
            } else {
              return res.end("done");
            }
          }
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    default:
      return res.end("invalid");
  }
};
