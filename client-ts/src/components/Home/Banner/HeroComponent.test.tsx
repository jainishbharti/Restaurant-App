import { screen, render} from "@testing-library/react";
import { HeroComponent } from "./HeroComponent";

describe('testing hero component', () => {
    test('render hero comp', () => {
        render(<HeroComponent />);
        const heroComponent = screen.getByTestId('hero-comp');
        expect(heroComponent).toBeInTheDocument();
    })
})