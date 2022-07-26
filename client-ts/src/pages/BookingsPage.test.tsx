import { render, screen } from "@testing-library/react";
import { BookingsPage } from "./BookingsPage";

describe("testing bookings page renders", () => {
  test("render bookings component", () => {
    render(<BookingsPage />);
    const bookingsComp = screen.getByTestId("bookings");
    expect(bookingsComp).toBeInTheDocument();
  });
});
