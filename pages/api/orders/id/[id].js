import dbConnection from "../../../../util/dbConnection";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../../models/order";
import Permission from "../../../../models/permission";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id }
  } = req;
  const { body } = req;

  switch (method) {
    case "PUT":
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
            switch (body.step) {
              case "record":
                permissions.includes("record orders") &&
                  Order.findByIdAndUpdate(
                    id,
                    { "progress.preparation.done": body.done },
                    (err) => {
                      return err && res.end("invalid");
                    }
                  ).exec();

                break;
              case "preparation":
                permissions.includes("prepare orders") &&
                  Order.findByIdAndUpdate(
                    id,
                    { "progress.audit.done": body.done },
                    (err) => {
                      return err && res.end("invalid");
                    }
                  ).exec();
                break;
              case "audit":
                permissions.includes("audit orders") &&
                  Order.findByIdAndUpdate(
                    id,
                    { "progress.dispatch.done": body.done },
                    (err) => {
                      return err && res.end("invalid");
                    }
                  ).exec();
                break;
              case "dispatch":
                permissions.includes("dispatch orders") &&
                  Order.findByIdAndUpdate(
                    id,
                    { "progress.arrive.done": body.done },
                    (err) => {
                      return err && res.end("invalid");
                    }
                  ).exec();
                break;
              case "cancelation":
                permissions.includes("cancel order") &&
                  Order.findByIdAndUpdate(
                    id,
                    { "progress.cancelation.done": body.done },
                    (err) => {
                      return err && res.end("invalid");
                    }
                  ).exec();
                break;
              default:
                return;
            }
            return res.end("done");
          }
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    default:
      return;
  }
};
