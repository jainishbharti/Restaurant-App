import { BookingForm } from "../Forms/BookingForm";
import * as Yup from "yup";
import { setSubmittingFunction } from "../Forms/BookingForm";
import axios from "axios";

type initialValueProps = {
  mobile: string;
};

const validationSchema = Yup.object({
  mobile: Yup.string()
    .required("Mobile is required!")
    .length(10, "Mobile can only be of length 10"),
});

const initialValues = {
  mobile: "",
};

const onSubmit = async (
  values: initialValueProps,
  { setSubmitting }: setSubmittingFunction
) => {
  const { mobile } = values;
  const formData = {
    mobile,
  };
  console.log(formData);
  axios
    .delete(`/bookings/${mobile}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log("Error from API", err));

  setSubmitting(false);
};

const fields = [
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
  },
];

export const DeleteBooking = () => {
  return (
    <div>
      <BookingForm
        handleSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
      />
    </div>
  );
};
