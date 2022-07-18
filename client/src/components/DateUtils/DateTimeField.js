import React from "react";
import { DateUtils } from "@react-force/date-utils";

export const DateTimeField = ({
  field,
  form,
  timezone,
  format = "YYYY-MM-DD hh:mm A",
}) => {
  const onBlur = () => {
    try {
      form.setValues({
        date: DateUtils.createDate(field.value, format, timezone),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <input
        className="form-control"
        placeholder={format}
        {...{ ...field, onBlur }}
      />
      {form.errors.date ? (
        <div className="text-danger">{form.errors.date}</div>
      ) : null}
    </React.Fragment>
  );
};