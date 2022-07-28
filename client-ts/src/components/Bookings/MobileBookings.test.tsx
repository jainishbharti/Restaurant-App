import { screen, render, fireEvent } from "@testing-library/react";
import { MobileBookings } from "./MobileBookings";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("testing mobileBookings", () => {


  test("render mobileBookings", () => {
    render(<MobileBookings />);
    expect(screen.getByTestId("getByMobile")).toBeInTheDocument();
  });

  test("checking validation of valid phone type", async () => {
    render(<MobileBookings />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "abcdefgh" },
      });
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(screen.getByText("Phone number is not valid")).toBeInTheDocument();
  });

  test("checking validation of required phone", async () => {
    render(<MobileBookings />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "" },
      });
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(screen.getByText("Mobile is required!")).toBeInTheDocument();
  });

  test("render bookings by mobile successfully", async () => {
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

    render(<MobileBookings />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "9102243139" },
      });
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(screen.getByText("Jainish Bharti")).toBeInTheDocument();
  });
});
