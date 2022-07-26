import { screen, render } from "@testing-library/react";
import { BookingCard } from "./BookingCard";

describe("testing booking card", () => {
  const booking = {
    mobile: "9576456928",
    reservationId: 13,
    seats: 2,
    table: {
      capacity: 2,
      status: "booked",
      tableId: 10,
      tableType: "two-seater",
    },
    timeOfReservation: "2022-07-14T05:29:41.565671",
    userName: "Saurabh Kumar Jha",
  };
  test("renders booking-card", () => {
    render(<BookingCard booking={booking} />);
    const bookingCard = screen.getByTestId("booking-card");
    expect(bookingCard).toBeInTheDocument();
  });
});
