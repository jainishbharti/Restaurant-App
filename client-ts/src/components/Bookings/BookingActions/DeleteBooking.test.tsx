import { screen, render} from "@testing-library/react";
import { DeleteBooking } from "./DeleteBooking";


describe('testing deleteBooking', () => {
    test('renders deleteBooking', () => {
        render(<DeleteBooking />);
        expect(screen.getByTestId("delete-booking")).toBeInTheDocument();
    })
})