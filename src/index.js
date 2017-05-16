import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './CamperLeaderboard';
import { getAjax } from './utils.js';
import './index.css';

renderPage();
// Update each 10 minutes
setInterval(function() {
  console.log('Updated');
  renderPage();
}, 10 * 60 * 1000);

function renderPage() {
  getUsersInfo().then(function(usersInfo) {
    ReactDOM.render(
      <CamperLeaderboard usersInfo={usersInfo} />,
      document.getElementById('root')
    );
  }, function(err) {
    console.log('Error: ' + err);
    ReactDOM.render(
      <CamperLeaderboard usersInfo={null} />,
      document.getElementById('root')
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
