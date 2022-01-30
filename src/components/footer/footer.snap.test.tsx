import { render } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
