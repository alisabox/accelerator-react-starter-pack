import { render } from '@testing-library/react';
import Card from './card';
import { guitars } from '../../mocks/mocks';

describe('Component: Card', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(<Card guitar={guitars[0]} />);
    expect(container).toMatchSnapshot();
  });
});
