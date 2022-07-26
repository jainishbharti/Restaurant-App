import { screen, render } from "@testing-library/react";
import { Bookings } from "./Bookings";

describe('testing bookings', () => {
    test('render bookings', () => {
        render(<Bookings />)
        const bookingsComp = screen.getByTestId("bookings");
        expect(bookingsComp).toBeInTheDocument();
    })
})