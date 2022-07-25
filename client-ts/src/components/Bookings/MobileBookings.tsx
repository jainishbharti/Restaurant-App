import axios from "axios";
import { useState } from "react";
import { BookingCard } from "./BookingCard";
import { BookingForm } from "./Forms/BookingForm";
import * as Yup from "yup";
import { initialValueProps, setSubmittingFunction } from "./Forms/BookingForm";
import { Button, Typography } from "@mui/material";

type BookingProp = {
    mobile: string;
    reservationId: number;
    seats: number;
    table: {
      capacity: number;
      status: string;
      tableId: number;
      tableType: string;
    };
    timeOfReservation: string;
    userName: string;
  }[];

const validationSchema = Yup.object({
    mobile: Yup.string()
      .required("Mobile is required!")
      .length(10, "Mobile no should be of length 10"),
  });

  const initialValues = {
    mobile: "",
  };

  const getReservationsFields = [
    {
      name: "mobile",
      type: "text",
      label: "Mobile",
    },
  ];

  export const MobileBookings = () => {
    const [bookingsByMobile, setBookingsByMobile] = useState<BookingProp>(
      [] as BookingProp
    );
  
    const getReservationByMobile = (
      values: initialValueProps,
      { setSubmitting }: setSubmittingFunction
    ) => {
      const { mobile } = values;
  
      axios
        .get(`/bookings/getbyMobile/${mobile}`)
        .then((res) => {
          if (res.status === 200) {
            setBookingsByMobile(res.data);
          }
        })
        .catch((err) => {
          console.log("Error from API", err);
        });
      setSubmitting(false);
    };
    
    const renderBookings = () => {
      if(bookingsByMobile.length >= 1){
        return bookingsByMobile.map((booking) => {
          return <BookingCard key={booking.reservationId} booking={booking} />;
        });
      } else return (<h4>No bookings found!</h4>)
      
    }
  
    return (
      <section>
        <Button
          sx={{
            border: "2px solid darkgray",
            borderRadius: 2,
            height: "auto",
            py: 1,
            px: 2,
            marginTop: '2rem'
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 550, color: "darkslategray" }}
          >
            Get Your Bookings
          </Typography>
        </Button>
          <div style={{width: '200px', color: 'red', height:'3px', background:'red', margin: 'auto', marginTop:'10px', marginBottom: '2rem'}}></div>
        <BookingForm
          handleSubmit={getReservationByMobile}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={getReservationsFields}
        />
        {renderBookings()}
      </ section>
    );
  };


