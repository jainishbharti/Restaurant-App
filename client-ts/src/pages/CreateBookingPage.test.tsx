import { screen, render } from "@testing-library/react";
import { CreateBookingPage } from "./CreateBookingPage";

describe("renders create-booking page", () => {
  test("renders createBooking component", () => {
    render(<CreateBookingPage />);
    const createBookingComp = screen.getByTestId("create-booking");
    expect(createBookingComp).toBeInTheDocument();
  });
});