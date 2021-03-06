import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Permission from "../../../models/permission";
import axios from "axios";

dbConnection();

export default async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user.roles.includes("GM")) {
      const balance = await axios
        .get(process.env.GetBalance)
        .then((response) => {
          return response.data.BALANCE;
        });
      return res.end(balance);
    }
  });
};
