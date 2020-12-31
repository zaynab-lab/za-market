import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Role from "../../../models/role";
import Permission from "../../../models/permission";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const token = req.cookies.jwt;

  if (!token) return res.end("noToken");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user.roles.includes("GM")) {
      switch (method) {
        case "POST":
          try {
            const { body } = req;
            const newrole = new Role({
              role: body.role
            });
            await newrole.save().catch((err) => console.log(err));
            return res.status(200).end(JSON.stringify(newrole));
          } catch (err) {
            return res.status(200).end("invalid");
          }
        case "GET":
          try {
            const roles = await Role.find({});
            const rolesList = roles.map((obj) => obj.role);
            return res.status(200).end(JSON.stringify(rolesList));
          } catch (err) {
            return res.status(200).end("invalid");
          }
        case "PUT":
          try {
            const rolesList = await Role.find({});
            await rolesList.map(async (obj) => {
              const permissionsList = await Permission.find({
                roles: { $in: [obj.role] }
              });
              const permissions = permissionsList.map((obj) => obj.permission);
              if (permissions !== obj.permissions) {
                Role.findByIdAndUpdate(obj._id, { permissions }, (err) => {
                  return err && res.end("invalid");
                }).exec();
              }
            });
            return res.status(200).end("done");
          } catch (err) {
            return res.status(200).end("invalid");
          }
        default:
          return res.status(200).end("invalid");
      }
    }
  });
};
