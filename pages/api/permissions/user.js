import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Permission from "../../../models/permission";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  return new Promise((resolve) => {
    switch (method) {
      case "GET":
        try {
          const token = req.cookies.jwt;
          if (!token) return res.end("noToken");
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.end("invalid");
            const user = await User.findById(decoded.id).exec();
            if (user.roles.length > 1) {
              const role = user.roles[1];
              const permissionsList = await Permission.find({
                roles: { $in: [role] }
              });
              const permissions = permissionsList.map((obj) => obj.permission);
              return res.status(200).end(JSON.stringify(permissions));
            }
            return res.status(200).end("no permissions");
          });
        } catch (err) {
          res.status(200).end("invalid");
          return resolve();
        }
        break;

      default:
        return res.status(200).end("invalid");
    }
  });
};
