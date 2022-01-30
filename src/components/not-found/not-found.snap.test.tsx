import { render } from '@testing-library/react';
import NotFound from './not-found';

describe('Component: Not Found', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
