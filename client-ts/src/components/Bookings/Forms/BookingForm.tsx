import { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BookingProp } from "../BookingActions/UpdateBooking";

export type initialValueProps = {
  userName?: string;
  mobile: string;
  seats?: string;
  timeOfReservation?: string;
};

export type setSubmittingFunction = {
  setSubmitting: (value: boolean) => void;
  resetForm: () => void;
};

type BookingFormProps = {
  handleSubmit: (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => void;
  initialValues: initialValueProps;
  validationSchema: {};
  updateValues?: BookingProp;
  fields: {
    name: string;
    type: string;
    label: string;
  }[];
};

export const BookingForm = ({
  handleSubmit,
  initialValues,
  updateValues,
  validationSchema,
  fields
}: BookingFormProps) => {
  const [error] = useState("");

  return (
    <div data-testid="booking-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            {fields.map((element) => {
              if (element.type !== "select") {
                return (
                  <Fragment key={element.name}>
                    <Field
                      as={TextField}
                      type={element.type}
                      name={element.name}
                      label={element.label}
                      placeholder={element.label}
                      variant="outlined"
                      sx={{
                        label: { color: "black" },
                        width: 300,
                        marginBottom: "1rem",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <ErrorMessage
                      name={element.name}
                      component="div"
                      className="err-msg"
                    />
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={element.name}>
                    <Field
                      as="select"
                      type={element.type}
                      name={element.name}
                      label={element.label}
                      variant="outlined"
                      data-testid='selectSeats'
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
                    <ErrorMessage
                      name={element.name}
                      component="div"
                      className="err-msg"
                    />
                  </Fragment>
                );
              }
            })}
            {error && <p className="err-msg">{error}</p>}

            <Button
              role="bookingAction"
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
