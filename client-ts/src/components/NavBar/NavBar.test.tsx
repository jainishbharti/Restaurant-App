import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

describe('testing navBar', () => {

    test("render navBar component", () => {
        render(<NavBar />)
        const navBarComp = screen.getByTestId("navBar");
        expect(navBarComp).toBeInTheDocument();
    })
})