import dbConnection from "../../../../util/dbConnection";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../../models/order";

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
          if (user.roles.includes("ordersManager")) {
            switch (body.step) {
              case "record":
                Order.findByIdAndUpdate(
                  id,
                  { "progress.preparation.done": body.done },
                  (err) => {
                    return err && res.end("invalid");
                  }
                ).exec();
                break;
              case "preparation":
                Order.findByIdAndUpdate(
                  id,
                  { "progress.audit.done": body.done },
                  (err) => {
                    return err && res.end("invalid");
                  }
                ).exec();
                break;
              case "audit":
                Order.findByIdAndUpdate(
                  id,
                  { "progress.dispatch.done": body.done },
                  (err) => {
                    return err && res.end("invalid");
                  }
                ).exec();
                break;
              case "dispatch":
                Order.findByIdAndUpdate(
                  id,
                  { "progress.arrive.done": body.done },
                  (err) => {
                    return err && res.end("invalid");
                  }
                ).exec();
                break;
              case "cancelation":
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
        console.log(err);
      }
      break;
    default:
      return;
  }
};
