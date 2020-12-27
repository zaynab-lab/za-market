import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";

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
        if (user.roles.includes("ordersManager")) {
          switch (step) {
            case "preparation":
              try {
                const orders = await Order.find({
                  "progress.preparation.done": true,
                  "progress.audit.done": false,
                  "progress.cancelation.done": false
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }
              break;
            case "audit":
              try {
                const orders = await Order.find({
                  "progress.audit.done": true,
                  "progress.dispatch.done": false,
                  "progress.cancelation.done": false
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }
              break;
            case "dispatch":
              try {
                const orders = await Order.find({
                  "progress.dispatch.done": true,
                  "progress.arrive.done": false,
                  "progress.cancelation.done": false
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }
              break;
            case "arrive":
              try {
                const orders = await Order.find({
                  "progress.arrive.done": true,
                  "progress.cancelation.done": false
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }
              break;
            case "cancel":
              try {
                const orders = await Order.find({
                  "progress.cancelation.done": true
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }
              break;
            case "return":
              try {
                const orders = await Order.find({
                  "progress.return.done": true
                });
                return res.status(200).end(JSON.stringify(orders));
              } catch (err) {
                console.log(err);
              }

              break;

            default:
              return res.status(200).end([]);
          }
        }
      });
    } catch (err) {
      return res.status(200).end("invalid");
    }
  }
};
