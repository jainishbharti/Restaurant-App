import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";


const validationSchema = Yup.object({
    mobile: Yup.string().required("Mobile is required!")
});

const initialValues = {
  mobile: ""
};

const onSubmit = async (values, { setSubmitting }) => {
    const { mobile } = values;
    const formData = {
      mobile
    };
    console.log(formData);
    
    setSubmitting(false);
  }

export const DeleteBooking = () => {
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
            
           
            {error && <p className="err-msg">{error}</p>}

            <Button
              role="deleteBooking"
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Delete Bookings
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
