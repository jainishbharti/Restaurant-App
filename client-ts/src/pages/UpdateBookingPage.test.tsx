import { screen, render } from "@testing-library/react";
import { UpdateBookingPage } from "./UpdateBookingPage";

describe("renders update-booking page", () => {
  test("renders updateBooking component", () => {
    render(<UpdateBookingPage />);
    const updateBookingComp = screen.getByTestId("update-booking");
    expect(updateBookingComp).toBeInTheDocument();
  });
});