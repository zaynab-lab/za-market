import dbConnection from "../../../util/dbConnection";
import jwt from "jsonwebtoken";
import cookie from "cookie";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    try {
      const token = req.cookies.jwt;
      if (!token) return res.end("noToken");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.end("invalid");
        return res.setHeader(
          "Set-Cookie",
          cookie.serialize("jwt", "", {
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            path: "/"
          })
        );
      });
    } catch (err) {
      res.end("invalid");
    }
  }
  res.end("invalid");
};
