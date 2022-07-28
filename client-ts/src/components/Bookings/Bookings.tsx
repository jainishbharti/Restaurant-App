import { useEffect, useState } from "react";
import { BookingCard } from "./BookingCard";
import axios from "axios";
import { Button, Typography } from "@mui/material";

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
      .get("bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderBookings = bookings.map((booking) => {
    return <BookingCard key={booking.reservationId} booking={booking} />;
  });

  return (
    <section data-testid="bookings">
      <Button
        sx={{
          border: "2px solid darkgray",
          borderRadius: 2,
          height: "auto",
          py: 1,
          px: 2,
          marginTop: "2rem",
        }}
      >
        <Typography
          variant="h6"
          component="span"
          sx={{ fontWeight: 550, color: "darkslategray" }}
        >
          Bookings for tonight
        </Typography>
      </Button>
      <div
        style={{
          width: "200px",
          color: "red",
          height: "3px",
          background: "red",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "2rem",
        }}
      ></div>
      <div className="flex" style={{ margin: "auto", height: "auto" }}>
        {renderBookings}
      </div>
    </section>
  );
};
