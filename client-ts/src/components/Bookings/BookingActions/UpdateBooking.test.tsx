import { screen, render, act, fireEvent } from "@testing-library/react";
import { UpdateBooking } from "./UpdateBooking";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    reservationId: 1,
  }),
}));

describe("testing updateBooking", () => {
  test("error rendering previous reservation details", async () => {
    const resp = {
      data: "Error fetching previous booking details!",
      status: 500,
    };
    mockedAxios.get.mockRejectedValue(resp);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    expect(
      screen.getByText("Error fetching previous booking details!")
    ).toBeInTheDocument();
  });

  test("checking validation", async () => {
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

    const resp = { data: results, status: 200 };
    mockedAxios.get.mockResolvedValue(resp);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "abcdefgh" },
      });
      fireEvent.change(screen.getByLabelText("Time of Reservation"), {
        target: { value: "" },
      });
      userEvent.selectOptions(screen.getByTestId("selectSeats"), [""]);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(screen.getByText("Your name is required!")).toBeInTheDocument();
    expect(screen.getByText("Phone number is not valid")).toBeInTheDocument();
    expect(
      screen.getByText("Time of reservation is required!")
    ).toBeInTheDocument();
    expect(screen.getByText("Seats is required!")).toBeInTheDocument();
  });

  test("updating reservation successfully", async () => {
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

    const resp = { data: results, status: 200 };
    mockedAxios.get.mockResolvedValue(resp);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Updated User" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "9102243138" },
      });
      fireEvent.change(screen.getByLabelText("Time of Reservation"), {
        target: { value: "2022-07-28T18:15" },
      });
      userEvent.selectOptions(screen.getByTestId("selectSeats"), ["4"]);
    });

    const res = { data: results, status: 200 };

    mockedAxios.put.mockResolvedValue(res);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(
      screen.getByText("Reservation updated successfully!")
    ).toBeInTheDocument();
  });

  test("getting api defined error", async () => {
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

    const resp = { data: results, status: 200 };
    mockedAxios.get.mockResolvedValue(resp);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Updated User" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "9102243138" },
      });
      fireEvent.change(screen.getByLabelText("Time of Reservation"), {
        target: { value: "2022-07-28T18:15" },
      });
      userEvent.selectOptions(screen.getByTestId("selectSeats"), ["2"]);
    });

    const err = {
      response: {
        data: "Sorry, No table for two available tonight!",
        status: 500,
      },
    };

    mockedAxios.put.mockRejectedValue(err);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(
      screen.getByText("Sorry, No table for two available tonight!")
    ).toBeInTheDocument();
  });

  test("getting some non-defined error", async () => {
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

    const resp = { data: results, status: 200 };
    mockedAxios.get.mockResolvedValue(resp);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Updated User" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "9102243138" },
      });
      fireEvent.change(screen.getByLabelText("Time of Reservation"), {
        target: { value: "2022-07-28T18:15" },
      });
      userEvent.selectOptions(screen.getByTestId("selectSeats"), ["2"]);
    });

    const err = {
      response: {
        data: "Something went wrong. Try booking again!",
        status: 503,
      },
    };

    mockedAxios.put.mockRejectedValue(err);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByRole("bookingAction"));
    });

    expect(
      screen.getByText("Something went wrong. Try booking again!")
    ).toBeInTheDocument();
  });
});
