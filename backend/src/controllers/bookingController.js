const Booking = require("../models/appointments");

exports.createBooking = async (req, res) => {
  const { date, slot, phone, name } = req.body;

  try {
    const resp = await Booking.create({ name, phone, date, slot });

    res.status(201).json({ message: "Slots added successfully" });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    res.status(500).json({ error: err.message });
  }
};

exports.getBookedTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    const bookings = await Booking.find({ date });

    const bookedSlots = bookings.map((booking) => booking.slot);

    res.json(bookedSlots);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
