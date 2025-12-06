import React, { useState } from "react";

const BookingSection: React.FC<{ price: number }> = ({ price }) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");

  // Calculate number of nights
  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPayment = price * nights;

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg sticky top-4">
      <h3 className="text-xl font-semibold mb-4">
        ${price.toLocaleString()}/night
      </h3>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          min={today}
          className="border border-gray-300 p-2 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn || today}
          className="border border-gray-300 p-2 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Total payment */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">
            ${price.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span className="font-semibold">${totalPayment.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg mt-2">
          <span>Total</span>
          <span>${totalPayment.toLocaleString()}</span>
        </div>
      </div>

      {/* Reserve button */}
      <button
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md font-semibold transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!checkIn || !checkOut || nights === 0}
      >
        Reserve now
      </button>
    </div>
  );
};

export default BookingSection;

