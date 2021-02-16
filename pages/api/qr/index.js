import dbConnection from "../../../util/dbConnection";
import QR from "../../../models/qr";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;

  if (method === "POST") {
    const qr = new QR({
      ip: body.ip
    });
    await qr.save().catch((err) => console.log(err));
  }
};
