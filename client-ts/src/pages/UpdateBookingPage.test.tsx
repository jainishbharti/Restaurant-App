import { screen, render } from "@testing-library/react";
import { UpdateBooking } from "../components/Bookings/BookingActions/UpdateBooking";

describe("renders update-booking page", () => {
  test("renders updateBooking component", () => {
    render(<UpdateBooking />);
    const updateBookingComp = screen.getByTestId("update-booking");
    expect(updateBookingComp).toBeInTheDocument();
  });
});