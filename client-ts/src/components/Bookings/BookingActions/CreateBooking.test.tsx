import { screen, render, fireEvent, act } from "@testing-library/react";
import { CreateBooking } from "./CreateBooking";
import axios from "axios";
import userEvent from '@testing-library/user-event'

// const ADD_BOOKING_URL: any = process.env.REACT_APP_BOOKING_URL;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing createBooking", () => {
  test("renders createBooking", () => {
    render(<CreateBooking />);
    expect(screen.getByTestId("create-booking")).toBeInTheDocument();
  });

  test("checking validation", async () => {
    render(<CreateBooking />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.change(screen.getByLabelText('Name'), {target: {value: ''}})
      fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: 'abcdefgh'}})
      fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: ''}})
      userEvent.selectOptions(screen.getByTestId('selectSeats'), [''])
    })

        // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.click(screen.getByRole('bookingAction'))
    })

    expect(screen.getByText('Your name is required!')).toBeInTheDocument();
    expect(screen.getByText('Phone number is not valid')).toBeInTheDocument();
    expect(screen.getByText('Time of reservation is required!')).toBeInTheDocument();
    expect(screen.getByText('Seats is required!')).toBeInTheDocument();

  })

  test("making a successfull  reservation", async () => {
    render(<CreateBooking />);

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

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'jainish'}})
      fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: '5213658974'}})
      fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: '2022-07-27T18:15'}})
      userEvent.selectOptions(screen.getByTestId('selectSeats'), ['4'])
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.click(screen.getByRole('bookingAction'))
    })

    expect(
      screen.getByText("Booking confirmed. You're assigned to Table 4")
    ).toBeInTheDocument();

  });

  test("check for error message with status 500", async () => {
    render(<CreateBooking />);


    const error = { response: {data: 'You can not book after 8 PM', status: 500} };
    mockedAxios.post.mockRejectedValue(error);


    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'jainish'}})
      fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: '5213658974'}})
      fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: '2022-07-27T20:15'}})
      userEvent.selectOptions(screen.getByTestId('selectSeats'), ['4'])
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.click(screen.getByRole('bookingAction'))
    })

    expect(
      screen.getByText("You can not book after 8 PM")
    ).toBeInTheDocument();

  });

  test("check for error message with status 404", async () => {
    render(<CreateBooking />);


    const error = { response: {data: 'Something went wrong. Please try again!', status: 404} };
    mockedAxios.post.mockRejectedValue(error);


    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'jainish'}})
      fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: '5213658974'}})
      fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: '2022-07-27T20:15'}})
      userEvent.selectOptions(screen.getByTestId('selectSeats'), ['4'])
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      fireEvent.click(screen.getByRole('bookingAction'))
    })

    expect(
      screen.getByText("Something went wrong. Try booking again!")
    ).toBeInTheDocument();

  });
});
