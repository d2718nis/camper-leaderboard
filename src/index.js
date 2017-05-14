import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './CamperLeaderboard';
import './index.css';

getAjax('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function(response) {
  console.log('success');
  ReactDOM.render(
    <CamperLeaderboard />,
    document.getElementById('root')
  );
}, function(err) {
  console.log('Error: ' + err);
  ReactDOM.render(
    <CamperLeaderboard />,
    document.getElementById('root')
  );
});

function getAjax(resource) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText);
        } else {
          reject(this.statusText);
        }
      }
    };
    xhttp.open('GET', resource, true);
    xhttp.send();
  });
}