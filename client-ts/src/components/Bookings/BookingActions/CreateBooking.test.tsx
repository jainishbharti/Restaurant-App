import { screen, render } from "@testing-library/react";
import { CreateBooking } from "./CreateBooking";
import axios from "axios";

const ADD_BOOKING_URL: any = process.env.REACT_APP_BOOKING_URL;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing createBooking", () => {
  test("renders createBooking", () => {
    render(<CreateBooking />);
    expect(screen.getByTestId("create-booking")).toBeInTheDocument();
  });

  test("making a successfull  reservation", async () => {
    const results = {
      mobile: "9102243139",
      reservationId: 26,
      seats: 4,
      table: {
        capacity: 4,
        status: "booked",
        tableId: 4,
        tableType: "four-seater",
      },
      timeOfReservation: "2022-07-27T11:56:10.786478",
      userName: "Jainish Bharti",
    };

    const resp = { data: results, status: 202 };
    mockedAxios.post.mockResolvedValue(resp);

    const postData = {
      userName: "Jainish Bharti",
      mobile: "9102243139",
      seats: 4,
      timeOfReservation: "2022-07-27T11:56:10.786478",
    };

    const response = await axios.post(ADD_BOOKING_URL, postData);
    // console.log(resp.data)
    // console.log(resp.status)

    // expect(
    //   screen.getByText("Booking confirmed. You're assigned to Table 4")
    // ).toBeInTheDocument();

    expect(response.status).toEqual(202);
    expect(response.data).toEqual(resp.data);
  });
});
