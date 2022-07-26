import { render, screen } from "@testing-library/react";
import AppFooter from "./AppFooter";

describe('testing footer',() => {
    test('render footer', () => {
        render(<AppFooter />);
        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
    })
})