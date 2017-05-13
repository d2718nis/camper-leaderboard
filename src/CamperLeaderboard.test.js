import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './CamperLeaderboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CamperLeaderboard />, div);
});
