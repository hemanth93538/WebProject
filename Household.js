import mongoose from "mongoose";

const householdSchema = new mongoose.Schema(
  {
    headName: { type: String, required: true },
    village: { type: String, required: true },
    members: { type: Number, required: true },
    chwId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // CHW assigned
    riskLevel: { type: String, default: "Low" }
  },
  { timestamps: true }
);

export default mongoose.model("Household", householdSchema);
