document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000"; // Replace with your backend API URL
  const dateInput = document.getElementById("date");
  const slotsContainer = document.getElementById("slots");
  const selectedSlotsContainer = document.getElementById("selected-slots");
  const bookButton = document.getElementById("book-appointment");
  console.log("====================================");
  console.log(bookButton);
  console.log("====================================");
  let selectedDate = "";
  let selectedSlots = [];

  const allAvailableSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
  ];

  const fetchSlots = async (date) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/bookings/booked-slots?date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch slots");
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching slots:", error);
      return [];
    }
  };

  const renderSlots = (bookedSlots) => {
    const availableSlots = allAvailableSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    slotsContainer.innerHTML = "";

    if (availableSlots.length === 0) {
      slotsContainer.innerHTML = "<p>No slots available for this date.</p>";
      return;
    }

    availableSlots.forEach((slot) => {
      const slotButton = document.createElement("button");
      slotButton.className = "slot available";
      slotButton.textContent = slot;

      slotButton.addEventListener("click", () =>
        toggleSlotSelection(slot, slotButton)
      );
      slotsContainer.appendChild(slotButton);
    });
  };

  const renderSelectedSlots = () => {
    selectedSlotsContainer.innerHTML = "";

    if (selectedSlots.length === 0) {
      selectedSlotsContainer.innerHTML = "<p>No slot selected.</p>";
      return;
    }

    selectedSlots.forEach((slot) => {
      const slotElement = document.createElement("div");
      slotElement.className = "selected-slot";
      slotElement.textContent = slot;
      selectedSlotsContainer.appendChild(slotElement);
    });
  };

  const toggleSlotSelection = (slot, button) => {
    if (selectedSlots.includes(slot)) {
      selectedSlots = [];
      button.classList.remove("selected");
    } else {
      const previouslySelectedButton =
        slotsContainer.querySelector(".selected");
      if (previouslySelectedButton) {
        previouslySelectedButton.classList.remove("selected");
      }
      selectedSlots = [slot];
      button.classList.add("selected");
    }
    renderSelectedSlots();
  };

  dateInput.addEventListener("change", async () => {
    selectedDate = dateInput.value;
    if (!selectedDate) return;

    selectedSlots = [];
    renderSelectedSlots();

    const bookedSlots = await fetchSlots(selectedDate);
    renderSlots(bookedSlots);
  });

  bookButton.addEventListener("click", async () => {
    console.log("====================================");
    console.log("ininin");
    console.log("====================================");
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!selectedDate || selectedSlots.length === 0 || !name || !phone) return;

    try {
      const response = await fetch(`${apiUrl}/api/bookings/add-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          date: selectedDate,
          slot: selectedSlots[0],
        }),
      });

      if (response.ok) {
        alert("Booking successful.");
        displaySuccessPopup(selectedDate, selectedSlots[0]);

        const bookedSlots = await fetchSlots(selectedDate);
        renderSlots(bookedSlots);

        dateInput.value = "";
        slotsContainer.innerHTML = "";
        selectedSlots = [];
        renderSelectedSlots();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  });

  const displaySuccessPopup = (date, slot) => {
    const bookingDetails = `Appointment booked for ${date} at ${slot}.`;
    document.getElementById("bookingDetails").textContent = bookingDetails;
    document.getElementById("successModal").style.display = "flex";
  };

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("successModal").style.display = "none";
  });
});
