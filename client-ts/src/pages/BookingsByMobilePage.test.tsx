import { screen, render } from "@testing-library/react";
import { BookingsByMobilePage } from "./BookingsByMobilePage";

describe("rendering bookingsByMobile page", () => {
  test("renders mobileBookings component", () => {
    render(<BookingsByMobilePage />);
    const mobileBookingComp = screen.getByTestId("getByMobile");
    expect(mobileBookingComp).toBeInTheDocument();
  });
});
