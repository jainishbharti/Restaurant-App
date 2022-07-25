import { BookingForm } from "../Forms/BookingForm";
import * as Yup from "yup";
import { initialValueProps, setSubmittingFunction } from "../Forms/BookingForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Stack, Typography } from "@mui/material";

const validationSchema = Yup.object({
  userName: Yup.string().required("Your name is required!"),
  mobile: Yup.string()
    .required("Mobile is required!")
    .length(10, "Mobile no should be of length 10"),
  seats: Yup.number().required("Seats is required!"),
  timeOfReservation: Yup.date().required("Time of reservation is required!"),
});

const initialValues = {
  userName: "",
  mobile: "",
  seats: "",
  timeOfReservation: "",
};

const fields = [
  {
    name: "userName",
    type: "text",
    label: "Name",
  },
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
  },
  {
    name: "seats",
    type: "select",
    label: "No. of seats",
  },
  {
    name: "timeOfReservation",
    type: "datetime-local",
    label: "Time of Reservation",
  },
];

export type BookingProp = {
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
};

export const UpdateBooking = () => {
  const [booking, setBooking] = useState<BookingProp>({} as BookingProp);
  const [formValues, setFormValues] = useState<initialValueProps>();
  const [message, setMessage] = useState({ message: "" });
  const [error, setError] = useState({ error: "" });

  let { reservationId } = useParams();

  useEffect(() => {
    if (reservationId) {
      axios
        .get(`/bookings/${reservationId}`)
        .then((res) => {
          if (res.status === 200) {
            // const { userName, mobile, seats, timeOfReservation } = res.data;
            // setFormValues({
            //   userName,
            //   mobile,
            //   seats: seats.toString(),
            //   timeOfReservation,
            // });
            setFormData(res.data);
            setBooking(res.data);
          }
        })
        .catch((err) => {
         setError({error: "Error fetching previous booking details!"});
         console.log(err);
        });
    }
  }, [reservationId]);

  const onSubmit = (
    values: initialValueProps,
    { setSubmitting, resetForm }: setSubmittingFunction
  ) => {
    const { userName, mobile, seats, timeOfReservation } = values;
    if (typeof seats !== "undefined") {
      const formData = {
        userName,
        mobile,
        seats: parseInt(seats),
        timeOfReservation
      };

      axios
        .put(`/bookings/${booking.reservationId}`, formData)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setFormData(res.data);
            setMessage({ message: "Reservation updated successfully!" });
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setError({ error: err.response.data });
          } else {
            setError({ error: "Something went wrong. Try booking again!" });
          }
        });  
    }
    setSubmitting(false);
    resetForm();
  };

  const setFormData = ({userName, mobile, seats, timeOfReservation} : initialValueProps) =>{
    if(typeof seats !== 'undefined'){
      setFormValues({
        userName,
        mobile,
        seats: seats.toString(),
        timeOfReservation,
      });
    }
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
            Modify Reservation
          </Typography>
        </Button>
          <div style={{width: '200px', color: 'red', height:'3px', background:'red', margin: 'auto', marginTop:'10px', marginBottom: '2rem'}}></div>
      {error.error ? (
        <Stack
          sx={{ width: "15%", margin: "auto", marginTop: "1rem" }}
          spacing={1}
        >
          <Alert severity="warning" onClose={() => setError({ error: "" })}>{error.error}</Alert>
        </Stack>
      ) : (
        ""
      )}
      {message.message ? (
        <Stack
          sx={{ width: "15%", margin: "auto", marginTop: "1rem" }}
          spacing={1}
        >
          <Alert
            onClose={() => {
              setMessage({ message: "" });
            }}
          >
            {message.message}
          </Alert>
        </Stack>
      ) : (
        ""
      )}
      {formValues ? (
        <BookingForm
          initialValues={formValues || initialValues}
          handleSubmit={onSubmit}
          updateValues={booking}
          validationSchema={validationSchema}
          fields={fields}
        />
      ) : (
        "Loading..."
      )}
    </section>
  );
};
