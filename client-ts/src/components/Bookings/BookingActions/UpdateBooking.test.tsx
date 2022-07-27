import { screen, render} from "@testing-library/react";
import { UpdateBooking } from "./UpdateBooking";
import axios from "axios"

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('testing updateBooking', () => {
    test('renders updateBooking', () => {
        render(<UpdateBooking />);
        expect(screen.getByTestId("update-booking")).toBeInTheDocument();
    })

    test('updating reservation',async () => {

        const resp = {data: "All bookings from 9102243139 removed!", status: 200};
        mockedAxios.delete.mockImplementationOnce(() => Promise.resolve(resp));

        const response = await axios.delete("/bookings/9102243139");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(resp.data);
        
    })
})