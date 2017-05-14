import React, { Component } from 'react';
import './CamperLeaderboard.css';

class CamperLeaderboard extends Component {
  render() {
    if (this.props.usersArray === null) {
      return (
        <div className="CamperLeaderboard">
          <h1>Camper Leaderboard</h1>
          <p>An error occured</p>
        </div>
      );
    } else {
      var users = this.props.usersArray;
      return (
        <div className="CamperLeaderboard">
          <h1>Camper Leaderboard</h1>
          <table>
            <tbody>
              <tr>
                <td>Num</td>
                <td>Image</td>
                <td>Name</td>
                <td>All time</td>
                <td>Recent</td>
                <td>Last update</td>
              </tr>
              {Array(users.length).fill(null).map((val, i) => (
                <tr key={'row' + i}>
                  <td>{i}</td>
                  <td><img alt={users[i].username + ' profile Image'} width="30" src={users[i].img} /></td>
                  <td>
                    <a href={'https://www.freecodecamp.com/' + users[i].username} target="_blank">
                      {users[i].username}
                    </a>
                  </td>
                  <td>{users[i].alltime}</td>
                  <td>{users[i].recent}</td>
                  <td>{users[i].lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CamperLeaderboard;
