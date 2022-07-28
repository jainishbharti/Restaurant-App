import { BookingForm } from "../Forms/BookingForm";
import * as Yup from "yup";
import { setSubmittingFunction } from "../Forms/BookingForm";
import axios from "axios";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

type initialValueProps = {
  mobile: string;
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
  mobile: Yup.string().required("Mobile is required").matches(phoneRegExp, 'Phone number is not valid').length(10, "Mobile must be length 10"),
});

const initialValues = {
  mobile: "",
};



const fields = [
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
  },
];

export const DeleteBooking = () => {
  const [message, setMessage] = useState({ message: "" });
  const [error, setError] = useState({ error: "" });

  const onSubmit = async (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => {
    const { mobile } = values;
    axios
      .delete(`/bookings/${mobile}`)
      .then((res) => {
        if(res.status === 200){
          setMessage({ message: res.data });
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setError({ error: err.response.data });
        } else {
          setError({ error: "Something went wrong. Try deleting again!" });
        }
      });
  
    setSubmitting(false);
  };


  return (
    <section data-testid="delete-booking">
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
            Delete Reservation
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
      <BookingForm
        handleSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
      />
    </section>
  );
};
