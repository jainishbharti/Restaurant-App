import { render, screen } from '@testing-library/react';
import Router from './Router';

test('renders routing page', () => {
  render(<Router />);
  const routeElement = screen.getByTestId("routing");
  expect(routeElement).toBeInTheDocument();
});
