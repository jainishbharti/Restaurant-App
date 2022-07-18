import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";

const validationSchema = Yup.object({
    userName: Yup.string().required("Your name is required!"),
    mobile: Yup.string().required("Mobile is required!"),
    seats: Yup.number().required("Seats is required!")
});

const initialValues = {
  userName: "",
  mobile: "",
  seats: "",
  timeOfReservation: new Date().toLocaleString(),
};

const onSubmit = async (values, { setSubmitting }) => {
    const { userName, mobile, seats, timeOfReservation } = values;
    const formData = {
      userName,
      mobile,
      seats,
      timeOfReservation,
    };
    console.log(formData);
    
    setSubmitting(false);
  }

export const BookingForm = () => {
    const [error, setError] = useState("");

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field
              as={TextField}
              type="text"
              name="userName"
              label="Name"
              variant="outlined"
              sx={{
                label: { color: "black" },
                width: 300,
                marginBottom: "1rem",
              }}
            />
            <ErrorMessage name="userName" component="div" className="err-msg" />
            <Field
              as={TextField}
              type="text"
              name="mobile"
              label="Mobile"
              variant="outlined"
              sx={{
                label: { color: "black" },
                width: 300,
                marginBottom: "1rem",
              }}
            />
            <ErrorMessage name="mobile" component="div" className="err-msg" />
            <Field
              as ="select"
              name="seats"
              label="No. of seats"
              variant="outlined"
              sx={{
                label: { color: "black" },
                width: 300,
                marginBottom: "1rem",
              }}
            >
                <option value="">No.of Seats</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </Field>
            <ErrorMessage name="seats" component="div" className="err-msg" />
           
            {error && <p className="err-msg">{error}</p>}

            <Button
              role="createBooking"
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Book Table
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
