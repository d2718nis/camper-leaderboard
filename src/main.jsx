import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CamperLeaderboard from './CamperLeaderboard.jsx';
import { getAjax } from './utils.js';
import './index.css';

renderPage();
// Update each 10 minutes
setInterval(function() {
  renderPage();
}, 10 * 60 * 1000);

function renderPage() {
  const root = document.getElementById('root');
  getUsersInfo().then(function(usersInfo) {
    createRoot(root).render(
      <CamperLeaderboard usersInfo={usersInfo} />
    );
  }, function(err) {
    console.log('Error: ' + err);
    createRoot(root).render(
      <CamperLeaderboard usersInfo={null} />
    );
  });
}

function getUsersInfo() {
  return new Promise(function(resolve, reject) {
    getAjax('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function(responseAllTime) {
      getAjax('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function(responseRecent) {
        resolve({
          allTime: responseAllTime,
          recent: responseRecent
        });
      }, function(err) {
        reject(err);
      });
    }, function(err) {
      reject(err);
    });
  });
}
