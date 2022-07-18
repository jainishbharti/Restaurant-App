import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BookingCard from "./BookingCard";

export const Bookings = () => {
  const [bookings, setBookings] = useState([
    {
      mobile: "9576456928",
      reservationId: 13,
      seats: 2,
      table: {
        capacity: 2,
        status: "booked",
        tableId: 10,
        tableType: "two-seater",
      },
      timeOfReservation: "2022-07-14T05:29:41.565671",
      userName: "Saurabh Kumar Jha",
    },
  ]);

  useEffect(() => {
    axios
      .get("/bookings/")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderBookings = bookings.map((booking) => {
    return <BookingCard key={booking.reservationId} booking={booking} />;
  });

  return <div className="flex" style={{margin: 'auto'}}>{renderBookings}</div>;
};
