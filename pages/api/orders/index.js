import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";
import { orderCode } from "../../../util/dateChanger";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const token = req.cookies.jwt;
        const { body } = req;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          var shouldpay = body.total + body.delivery;
          if (user) {
            if (body.toggle) {
              shouldpay =
                body.total + body.delivery - user.amount > 0
                  ? body.total + body.delivery - user.amount
                  : 0;
              const amount =
                user.amount - (body.total + body.delivery) > 0
                  ? user.amount - (body.total + body.delivery)
                  : 0;
              await User.findByIdAndUpdate(
                user._id,
                { amount: amount },
                (err) => {
                  return err && res.end("invalid");
                }
              ).exec();
            }
            await User.findByIdAndUpdate(
              user._id,
              { ordertimes: user.ordertimes + 1 },
              (err) => {
                return err && res.end("invalid");
              }
            ).exec();
            if (user.invitedBy > 0 && user.ordertimes > 0) {
              const userInv = await User.findOne({
                promoCode: atob(body.invitedBy)
              }).exec();
              await User.findByIdAndUpdate(
                userInv._id,
                {
                  amount: userInv.amount + 5000
                },
                (err) => console.log(err)
              );
            }

            const newOrderCode = orderCode();

            const order = new Order({
              userID: user._id,
              userName: user.name,
              orderCode: newOrderCode,
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
