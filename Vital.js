import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    temperature: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    pulse: { type: Number, required: true },
    village: { type: String, required: true },
    recordedBy: { type: String, default: "CHW" }
  },
  { timestamps: true }
);

export default mongoose.model("Vital", vitalSchema);
