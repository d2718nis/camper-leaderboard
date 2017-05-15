import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './CamperLeaderboard';
import './index.css';

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

function getAjax(resource) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var response;
          if (this.responseText) {
            try {
              response = JSON.parse(this.responseText);
            } catch(e) {
              reject('JSON parse error: ' + e);
            }
          }
          resolve(response);
        } else {
          reject('HTTP Error: ' + this.statusText);
        }
      }
    };
    xhttp.open('GET', resource, true);
    xhttp.send();
  });
}
