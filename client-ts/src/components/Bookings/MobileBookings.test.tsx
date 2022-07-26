import { screen, render } from "@testing-library/react";
import { MobileBookings } from "./MobileBookings";

describe('testing mobileBookings', () => {
    test("render mobileBookings", () => {
        render(<MobileBookings />)
        expect(screen.getByTestId("getByMobile")).toBeInTheDocument();
    })
})