import { screen, render } from "@testing-library/react";
import {
  BookingForm,
  initialValueProps,
  setSubmittingFunction,
} from "./BookingForm";
import * as Yup from "yup";

describe("testing booking form", () => {
  const validationSchema = Yup.object({
    userName: Yup.string().required("Your name is required!"),
    mobile: Yup.string()
      .required("Mobile is required!")
      .length(10, "Mobile no should be of length 10"),
    seats: Yup.number().required("Seats is required!"),
    timeOfReservation: Yup.date().required("Time of reservation is required!"),
  });

  const onSubmit = (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => {
    console.log(values);
    setSubmitting(false);
  };

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

  test("render booking-form component", () => {
    render(
      <BookingForm
        handleSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
      />
    );

    const BookingFormComp = screen.getByTestId("booking-form");
    expect(BookingFormComp).toBeInTheDocument();
  });
});
