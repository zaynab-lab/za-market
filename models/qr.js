const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    ip: { type: String }
  },
  { collection: "qrs" }
);

export default mongoose.models.QR || mongoose.model("QR", qrSchema);
