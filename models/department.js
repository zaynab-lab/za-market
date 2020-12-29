const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String },
    pages: { type: [String] },
    roles: { type: [String] }
  },
  { collection: "departments" }
);

export default mongoose.models.Order ||
  mongoose.model("Department", departmentSchema);
