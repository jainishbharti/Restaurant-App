import { screen, render } from "@testing-library/react";
import { DeleteBookingPage } from "./DeleteBookingPage";

describe("renders delete-booking page", () => {
  test("renders deleteBooking component", () => {
    render(<DeleteBookingPage />);
    const deleteBookingComp = screen.getByTestId("delete-booking");
    expect(deleteBookingComp).toBeInTheDocument();
  });
});