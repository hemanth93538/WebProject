import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    patientName: String,
    ageRange: { type: String, required: true },
    village: { type: String, required: true },
    symptoms: { type: [String], required: true },
    onsetDate: { type: Date, required: true },
    additionalNotes: String,
    status: { type: String, default: "Reported" }
  },
  { timestamps: true }
);

const Case = mongoose.models.Case || mongoose.model("Case", caseSchema);
export default Case;
