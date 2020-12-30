const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    permission: { type: String },
    roles: { type: [String], default: ["GM"] }
  },
  { collection: "permissions" }
);

export default mongoose.models.Permission ||
  mongoose.model("Permission", permissionSchema);
