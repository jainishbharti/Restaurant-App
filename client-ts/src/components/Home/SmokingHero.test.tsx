import { render, screen } from "@testing-library/react";
import SmokingHero from "./SmokingHero";

describe('testing smoking-hero', () => {
    test('render smokingHero - support component', () => {
        render(<SmokingHero />)
        const supportComp = screen.getByTestId("support");
        expect(supportComp).toBeInTheDocument();
    })
})