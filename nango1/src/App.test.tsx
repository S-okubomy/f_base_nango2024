import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Event from './Event';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Event />
    </Provider>
  );

  // console.log(getByText('■イベントカレンダー■'));

  expect(getByText('■イベントカレンダー■')).toBeInTheDocument();
});
