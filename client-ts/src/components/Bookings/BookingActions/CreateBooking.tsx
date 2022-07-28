import { BookingForm, initialValueProps } from "../Forms/BookingForm";
import * as Yup from "yup";
import { setSubmittingFunction } from "../Forms/BookingForm";
import axios from "axios";
import { useState } from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
  userName: Yup.string().required("Your name is required!"),
  // mobile: Yup.number()
  //   .required("Mobile is required!").min(1234567890).max(9999999999),
  mobile: Yup.string().required("Mobile is required!").matches(phoneRegExp, 'Phone number is not valid').length(10, "Mobile must be length 10"),
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

export const CreateBooking = () => {
  const [message, setMessage] = useState({ message: "" });
  const [error, setError] = useState({ error: "" });

  const onSubmit = (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => {
    const { userName, mobile, seats, timeOfReservation } = values;
    // if (typeof seats !== undefined) {
      const formData = {
        userName,
        mobile,
        seats,
        timeOfReservation,
      };
      axios
        .post("/bookings", formData)
        .then((res) => {
          if (res.status === 202) {
            setMessage({
              message: `Booking confirmed. You're assigned to Table ${res.data.table.tableId}`,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setError({ error: err.response.data });
          } else {
            setError({ error: "Something went wrong. Try booking again!" });
          }
        });
    // }

    setSubmitting(false);
  };

  return (
    <section data-testid="create-booking">
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
          Make a Reservation
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
      {error.error ? (
        <Stack
          sx={{ width: "18%", margin: "auto", marginTop: "1rem" }}
          spacing={1}
        >
          <Alert severity="warning" onClose={() => setError({ error: "" })}>
            {error.error}
          </Alert>
        </Stack>
      ) : (
        ""
      )}
      {message.message ? (
        <Stack
          sx={{ width: "18%", margin: "auto", marginTop: "1rem" }}
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

      <BookingForm
        handleSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
      />
    </section>
  );
};
