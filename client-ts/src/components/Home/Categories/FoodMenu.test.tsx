import { screen, render } from "@testing-library/react";
import { FoodMenu } from "./FoodMenu";

describe("testing food-categories component", () => {
    test('render food-menu component', () => {
        render(<FoodMenu />)
        const foodComp = screen.getByTestId("food-categories");
        expect(foodComp).toBeInTheDocument();
    })
})