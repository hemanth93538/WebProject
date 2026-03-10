import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    village: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
