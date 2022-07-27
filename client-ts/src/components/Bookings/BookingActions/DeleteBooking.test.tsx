import { screen, render, fireEvent, act } from "@testing-library/react";
import { DeleteBooking } from "./DeleteBooking";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing deleteBooking", () => {
  test("renders deleteBooking", () => {
    render(<DeleteBooking />);
    expect(screen.getByTestId("delete-booking")).toBeInTheDocument();
  });

  test("deleting reservation successfully", async () => {
    render(<DeleteBooking />);

    const resp = { data: "All bookings from 9102243139 removed!", status: 200 };
    mockedAxios.delete.mockResolvedValue(resp);

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

    expect(
      screen.getByText("All bookings from 9102243139 removed!")
    ).toBeInTheDocument();
  });


  test("when it cannot find the reservation", async () => {
    render(<DeleteBooking />);

    const err = {response : { data: "No bookings found from 9102243139!", status: 500 }};
    mockedAxios.delete.mockRejectedValue(err);

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

    expect(
      screen.getByText("No bookings found from 9102243139!")
    ).toBeInTheDocument();
  });


});
