import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Footer from './footer';

const mockStore = configureMockStore();
const store = mockStore();
const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render (
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
  });
});  
