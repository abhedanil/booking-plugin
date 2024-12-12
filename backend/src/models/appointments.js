const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: { type: String, required: true },
  slot: { type: String, required: true },
});
module.exports = mongoose.model("AppointmentSlot", AppointmentSchema);
