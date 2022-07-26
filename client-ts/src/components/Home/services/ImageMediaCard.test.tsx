import { screen, render } from "@testing-library/react";
import ImageMediaCard from "./ImageMediaCard";

describe('testing servicecard', () => {

    const service = {
        button: {
            title: 'Add Reservation',
            href: '/booking/add/'
        },
        title: 'Making a Reservation',
        description: 'How can creating a reservation by yourself is more feasible!'
    }

    test("renders service card", () => {
        render(<ImageMediaCard service= { service }/>)
        const serviceCard = screen.getByTestId("service-card");
        expect(serviceCard).toBeInTheDocument();
    })
})