import { screen, render } from "@testing-library/react";
import { Background } from "./Background";

describe('testing background', () => {
     test('render background component', () => {
        render(<Background>{}</Background> )
        const backgroundComp = screen.getByTestId("bg");
        expect(backgroundComp).toBeInTheDocument()
     })
})