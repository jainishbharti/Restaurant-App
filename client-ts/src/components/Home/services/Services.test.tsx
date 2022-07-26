import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe('testing services-hero', () => {
    test('render actions component', () => {
        render(<Services />)
        const servicesComp = screen.getByTestId("actions");
        expect(servicesComp).toBeInTheDocument();
    })
})