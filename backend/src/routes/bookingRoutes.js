const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/add-slot", bookingController.createBooking);

router.get("/booked-slots", bookingController.getBookedTimeSlots);

module.exports = router;
