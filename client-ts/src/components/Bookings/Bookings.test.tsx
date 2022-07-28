import { screen, render, fireEvent } from "@testing-library/react";
import { Bookings } from "./Bookings";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let useState = jest.fn();
let bookings = Promise.resolve([]);
let setBookings = jest.fn();

useState.mockReturnValue([bookings, setBookings]);

describe("testing bookings", () => {


  test("checking successfull fetch of bookings", async () => {

    const results = [
        {
          mobile: "9102243139",
          reservationId: 39,
          seats: 4,
          table: {
            capacity: 4,
            status: "booked",
            tableId: 4,
            tableType: "four-seater",
          },
          timeOfReservation: "2022-07-27T11:56:10.786478",
          userName: "Jainish Bharti",
        },
      ];
      
      mockedAxios.get.mockResolvedValue({ data: results, status: 200 });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        render(<Bookings />);
      })

      expect(screen.getByText("Jainish Bharti")).toBeInTheDocument();
    
  });


});
