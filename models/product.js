const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    category: { type: String },
    subCategory: { type: String, default: "" },
    initprice: { type: Number },
    price: { type: Number },
    measure: { type: String },
    img: { type: Boolean, default: false },
    exist: { type: Boolean, default: true },
    appear: { type: Boolean, default: true },
    description: { type: String }
  },

  { collection: "products" }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
