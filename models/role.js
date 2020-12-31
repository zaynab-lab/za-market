const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: { type: String },
    permissions: { type: [String] }
  },
  { collection: "roles" }
);

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
