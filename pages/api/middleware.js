import jwt from "jsonwebtoken";
import User from "../../models/user";

const authenticate = async (req, res, fn) => {
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user) {
      ////
    }
  });
  return res.end("invalid");
};

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

export default authenticate;
