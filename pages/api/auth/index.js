import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async function Auth(req, res) {
  const { method } = req;
  if (method === "GET") {
    const token = req.cookies.jwt;
    if (!token) return res.end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      console.log(token);
      if (err) return res.end("invalid");
      const user = await User.findById(decoded.id).exec();
      User.findByIdAndUpdate(
        user._id,
        { workingtimes: user.workingtimes + 1 },
        (err) => console.log(err)
      );

      return res.end(
        JSON.stringify({
          name: user.name,
          amount: user.amount,
          number: user.number,
          mail: user.mail,
          birth: user.birth,
          roles: user.roles,
          pages: user.pages,
          promoCode: user.promoCode,
          invitations: user.invitations,
          activeInvitations: user.activeInvitations
        })
      );
    });
  } else {
    return res.end("invalid");
  }
}
