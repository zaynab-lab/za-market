import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";

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
          if (user.roles.includes("ordersManager")) {
            const orders = await Order.find({
              "progress.preparation.done": false,
              "progress.cancelation.done": false
            });
            return res.status(200).end(JSON.stringify(orders));
          }
          return res.status(200).end("done");
        });
      } catch (err) {
        return res.status(200).end("invalid");
      }
      break;
    case "POST":
      try {
        const token = req.cookies.jwt;
        const { body } = req;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          var shouldpay = body.total + body.delivery;
          if (body.toggle) {
            shouldpay =
              body.total + body.delivery - user.amount > 0
                ? body.total + body.delivery - user.amount
                : 0;
            const amount =
              user.amount - (body.total + body.delivery) > 0
                ? user.amount - (body.total + body.delivery)
                : 0;
            User.findByIdAndUpdate(user._id, { amount: amount }, (err) => {
              return err && res.end("invalid");
            }).exec();
          }
          if (user) {
            const order = new Order({
              userID: user._id,
              userName: user.name,
              orderCode: body.orderCode,
              number: user.number,
              products: body.proceedProducts,
              delivery: body.delivery,
              total: body.total,
              shouldpay: shouldpay,
              paymentMethod: body.payment,
              address: body.selectedAddress
            });
            await order.save().catch((err) => console.log(err));
            return res.status(200).end("done");
          }
          return res.status(200).end("invalid");
        });
      } catch (err) {
        return res.status(200).end("invalid");
      }
      break;
    default:
      return res.status(200).end("invalid");
  }
};
