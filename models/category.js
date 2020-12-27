const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    title: { type: String },
    subCategory: { type: [String] }
  },
  { collection: "categories" }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
