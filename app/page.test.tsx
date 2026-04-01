import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render successfully', () => {
    // Basic test to ensure the Next.js page renders without crashing
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});
