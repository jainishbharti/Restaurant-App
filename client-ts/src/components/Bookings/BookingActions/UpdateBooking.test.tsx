import { screen, render, act, fireEvent } from "@testing-library/react";
import { UpdateBooking } from "./UpdateBooking";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let useState = jest.fn();
let formData = Promise.resolve({});
let setFormData = jest.fn();

useState.mockReturnValue([formData, setFormData]);

// jest.spyOn(React, "useState").mockImplementation(mockUseState);
const cb = () => {
  return {
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
};
jest.spyOn(React, "useEffect").mockImplementationOnce(cb);

describe("testing updateBooking", () => {
  test("renders updateBooking", () => {
    render(<UpdateBooking />);
    expect(screen.getByTestId("update-booking")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });



  // test("checking validation", async () => {
  //   render(<UpdateBooking />);

  //   // eslint-disable-next-line testing-library/no-unnecessary-act
  //   await act(async() => {
  //     fireEvent.change(screen.getByLabelText('Name'), {target: {value: ''}})
  //     fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: 'abcdefgh'}})
  //     fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: ''}})
  //     userEvent.selectOptions(screen.getByTestId('selectSeats'), [''])
  //   })

  //       // eslint-disable-next-line testing-library/no-unnecessary-act
  //   await act(async() => {
  //     fireEvent.click(screen.getByRole('bookingAction'))
  //   })

  //   expect(screen.getByText('Your name is required!')).toBeInTheDocument();
  //   expect(screen.getByText('Phone number is not valid')).toBeInTheDocument();
  //   expect(screen.getByText('Time of reservation is required!')).toBeInTheDocument();
  //   expect(screen.getByText('Seats is required!')).toBeInTheDocument();

  // })



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

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<UpdateBooking />);
    });

    const resp = { data: results, status: 200 };
    mockedAxios.get.mockResolvedValue(resp);

    // screen.debug(null, 300000);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    // await act(async () => {
    //     fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Jainish Bharti'}})
    //   fireEvent.change(screen.getByLabelText('Mobile'), {target: {value: '9102243139'}})
    //   fireEvent.change(screen.getByLabelText('Time of Reservation'), {target: {value: '2022-07-27T18:15'}})
    //   userEvent.selectOptions(screen.getByTestId('selectSeats'), ['4'])
    // });

    // // eslint-disable-next-line testing-library/no-unnecessary-act
    // await act(async() => {
    //     fireEvent.click(screen.getByRole('bookingAction'))
    //   })
  });
});
