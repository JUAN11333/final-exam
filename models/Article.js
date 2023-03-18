import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    supplier_name: String,
    adress: String,
    phone_number: String,
  },
  { strict: false }
);

module.exports =
  mongoose.models.article || mongoose.model("article", articleSchema);
