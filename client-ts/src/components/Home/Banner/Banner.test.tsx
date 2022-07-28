import { screen, render } from "@testing-library/react";
import { Banner } from "./Banner";

describe("testing banner", () => {
    test('render banner component', () => {
        render(<Banner />)
        const bannerComp = screen.getByTestId("banner");
        expect(bannerComp).toBeInTheDocument();
    })
})