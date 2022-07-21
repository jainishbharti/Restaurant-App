import { BookingForm, initialValueProps } from "../Forms/BookingForm";
import * as Yup from "yup";
import { setSubmittingFunction } from "../Forms/BookingForm";
import axios from "axios";
import { useState } from "react";

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

export const CreateBooking = () => {

  const [message, setMessage] = useState({message: ""});
  const [error, setError] = useState({error: ""})


  const onSubmit = (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => {
    const { userName, mobile, seats, timeOfReservation } = values;
    if (typeof seats !== "undefined") {
      const formData = {
        userName,
        mobile,
        seats: parseInt(seats),
        timeOfReservation,
      };
      axios
        .post("/bookings", formData)
        .then((res) => {
          if(res.status === 202){
            // console.log('Response from server: ', res.data);
            setMessage({ message: "Reservation created successfully!"})
          }
        })
        .catch((err) => {
          if(err.response.status === 500){
            setError({error: err.response.data})
          } else{
            setError({error: "Something went wrong. Try booking again!"})
          }
         
        });
    }
  
    setSubmitting(false);
  };

  return (
    <div>
      {error.error ? error.error : ""}
      {message.message ? message.message : ""}
      <BookingForm
        handleSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
      />
    </div>
  );
};
