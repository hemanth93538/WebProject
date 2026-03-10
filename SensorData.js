// backend/models/SensorData.js
import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    ph: { type: Number, required: true },
    turbidity: { type: Number, required: true },
    temperature: { type: Number, required: true },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
  }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;
