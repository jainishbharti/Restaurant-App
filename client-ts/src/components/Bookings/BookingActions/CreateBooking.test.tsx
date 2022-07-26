import { screen, render} from "@testing-library/react";
import { CreateBooking } from "./CreateBooking";

describe('testing createBooking', () => {
    test('renders createBooking', () => {
        render(<CreateBooking />);
        expect(screen.getByTestId("create-booking")).toBeInTheDocument();
    })
})