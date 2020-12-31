import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";
import Permission from "../../../models/permission";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const {
    query: { step }
  } = req;

  if (method === "GET") {
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
          switch (step) {
            case "record":
              try {
                if (permissions.includes("view record orders")) {
                  const orders = await Order.find({
                    "progress.preparation.done": false,
                    "progress.cancelation.done": false
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "preparation":
              try {
                if (permissions.includes("view prepare orders")) {
                  const orders = await Order.find({
                    "progress.preparation.done": true,
                    "progress.audit.done": false,
                    "progress.cancelation.done": false
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "audit":
              try {
                if (permissions.includes("view audit orders")) {
                  const orders = await Order.find({
                    "progress.audit.done": true,
                    "progress.dispatch.done": false,
                    "progress.cancelation.done": false
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "dispatch":
              try {
                if (permissions.includes("view dispatch orders")) {
                  const orders = await Order.find({
                    "progress.dispatch.done": true,
                    "progress.arrive.done": false,
                    "progress.cancelation.done": false
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "arrive":
              try {
                if (permissions.includes("arrived orders")) {
                  const orders = await Order.find({
                    "progress.arrive.done": true,
                    "progress.cancelation.done": false
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "cancel":
              try {
                if (permissions.includes("canceled orders")) {
                  const orders = await Order.find({
                    "progress.cancelation.done": true
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            case "return":
              try {
                if (permissions.includes("returned orders")) {
                  const orders = await Order.find({
                    "progress.return.done": true
                  });
                  return res.status(200).end(JSON.stringify(orders));
                } else {
                  return res.status(200).end([]);
                }
              } catch (err) {
                return res.status(200).end([]);
              }
            default:
              return res.status(200).end([]);
          }
        } else {
          return res.status(200).end([]);
        }
      });
    } catch (err) {
      return res.status(200).end("invalid");
    }
  }
};
