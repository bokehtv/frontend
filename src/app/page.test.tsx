import { render } from '@testing-library/react';

describe('Sanity Check', () => {
  it('should prove Jest is configured properly and React is available', () => {
    const { container } = render(<div>BokehTV</div>);
    expect(container.textContent).toBe('BokehTV');
  });
});
