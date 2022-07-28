import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { NavBar } from "./NavBar";

describe('testing navBar', () => {

    test("render navBar component", async () => {
        render(<NavBar />)
        const navBarComp = screen.getByTestId("navBar");
        expect(navBarComp).toBeInTheDocument();

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            userEvent.click(screen.getByRole("openDropdown"));
        })

    })

    
})