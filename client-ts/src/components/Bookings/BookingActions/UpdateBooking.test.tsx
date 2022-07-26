import { screen, render} from "@testing-library/react";
import { UpdateBooking } from "./UpdateBooking";

describe('testing updateBooking', () => {
    test('renders updateBooking', () => {
        render(<UpdateBooking />);
        expect(screen.getByTestId("update-booking")).toBeInTheDocument();
    })
})