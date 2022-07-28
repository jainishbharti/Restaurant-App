import { render, screen } from '@testing-library/react';
import { HeroComponent } from '../components/Home/Banner/HeroComponent';
import { FoodMenu } from '../components/Home/Categories/FoodMenu';
import { Services } from '../components/Home/services/Services';
import SmokingHero from '../components/Home/SmokingHero';
import { HomePage } from './HomePage';

describe("testing home-page", () => {

    test('testing whole comp', () => {
        render(<HomePage />)
        const heroComp = screen.getByTestId("hero-comp");
        const actionComp = screen.getByTestId("actions");
        const foodCateg = screen.getByTestId("food-categories");
        const supportComp = screen.getByTestId("support");
        expect(heroComp).toBeInTheDocument();
        expect(actionComp).toBeInTheDocument();
        expect(foodCateg).toBeInTheDocument();
        expect(supportComp).toBeInTheDocument();
    })

    test('render hero component', () => {
        render(<HeroComponent />);
        const heroComp = screen.getByTestId("hero-comp");
        expect(heroComp).toBeInTheDocument();
    })
    
    test('render services component', () => {
        render(<Services />);
        const actionComp = screen.getByTestId("actions");
        expect(actionComp).toBeInTheDocument();
    })

    test('render food-menu component', () => {
        render(<FoodMenu />);
        const foodCateg = screen.getByTestId("food-categories");
        expect(foodCateg).toBeInTheDocument();
    })

    test('render support component', () => {
        render(<SmokingHero />);
        const supportComp = screen.getByTestId("support");
        expect(supportComp).toBeInTheDocument();
    })

})