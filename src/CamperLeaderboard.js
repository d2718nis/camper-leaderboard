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
      return (
        <div className="CamperLeaderboard">
          <h1>Camper Leaderboard</h1>
          <LeaderboardTable usersArray={this.props.usersArray} />
        </div>
      );
    }
  }
}

class LeaderboardTable extends Component {
  render() {
    return (
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
          {Array(this.props.usersArray.length).fill(null).map((val, i) => (
            <LeaderboardRow key={'row' + i} rowNum={i+1} userInfo={this.props.usersArray[i]} />
          ))}
        </tbody>
      </table>
    );
  }
}

class LeaderboardRow extends Component {
  render() {
    return(
      <tr>
        <td>{this.props.rowNum}</td>
        <td><img alt={this.props.userInfo.username + ' profile Image'} width="30" src={this.props.userInfo.img} /></td>
        <td>
          <a href={'https://www.freecodecamp.com/' + this.props.userInfo.username} target="_blank">
            {this.props.userInfo.username}
          </a>
        </td>
        <td>{this.props.userInfo.alltime}</td>
        <td>{this.props.userInfo.recent}</td>
        <td>{this.props.userInfo.lastUpdate}</td>
      </tr>
    );
  }
}

export default CamperLeaderboard;
