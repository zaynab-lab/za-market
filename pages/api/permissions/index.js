import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Permission from "../../../models/permission";

dbConnection();

export default async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user.roles.includes("GM")) {
      const { method } = req;
      switch (method) {
        case "GET":
          try {
            const permissionsList = await Permission.find({});
            const permissions = permissionsList.map((obj) => obj.permission);
            return res.status(200).end(JSON.stringify(permissions));
          } catch (err) {
            return res.status(200).end("invalid");
          }
        case "POST":
          try {
            const { body } = req;
            if (body.permission) {
              const createPermission = new Permission({
                permission: body.permission
              });
              createPermission.save().catch((err) => console.log(err));
            }
          } catch (err) {
            return res.status(200).end("invalid");
          }
          break;
        default:
          return res.status(200).end("invalid");
      }
    }
  });
};
