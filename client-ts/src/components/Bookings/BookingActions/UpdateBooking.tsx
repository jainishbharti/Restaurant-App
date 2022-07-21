import { BookingForm } from "../Forms/BookingForm";
import * as Yup from "yup";
import { initialValueProps, setSubmittingFunction } from "../Forms/BookingForm";


const validationSchema = Yup.object({
    userName: Yup.string().required("Your name is required!"),
    mobile: Yup.string().required("Mobile is required!").length(10, 'Mobile no should be of length 10'),
    seats: Yup.number().required("Seats is required!"),
    timeOfReservation: Yup.date().required("Time of reservation is required!")

  });
  
  const initialValues = {
    userName: "",
    mobile: "",
    seats: "",
    timeOfReservation: "",
  };
  
  const onSubmit = async (
    values: initialValueProps,
    { setSubmitting }: setSubmittingFunction
  ) => {
    const { userName, mobile, seats, timeOfReservation } = values;
    const formData = {
      userName,
      mobile,
      seats,
      timeOfReservation,
    };
    console.log(formData);
  
    setSubmitting(false);
  };

  const fields = [
    {
        name: 'userName',
        type: 'text',
        label: 'Name'
    },
    {
        name: 'mobile',
        type: 'text',
        label: 'Mobile'
    },
    {
        name: 'seats',
        type: 'select',
        label: 'No. of seats'
    },
    {
        name: 'timeOfReservation',
        type: 'datetime-local',
        label: 'Time of Reservation'
    },
  ]

export const UpdateBooking = () => {
  return (
    <div>
        <BookingForm handleSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} fields={fields}/>
    </div>
  )
}
