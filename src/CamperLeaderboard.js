import React, { Component } from 'react';
import './CamperLeaderboard.css';

class CamperLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: {
        allTime: null,
        recent: null
      }
    };
  }

  render() {
    if (this.props.usersInfo === null) {
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
          <LeaderboardTable usersInfo={this.props.usersInfo.allTime} />
        </div>
      );
    }
  }
}

class LeaderboardTable extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Num</td>
            <td>Image</td>
            <td>Name</td>
            <td>All time</td>
            <td>Recent</td>
            <td>Last update</td>
          </tr>
        </thead>
        <tbody>
          {Array(this.props.usersInfo.length).fill(null).map((val, i) => (
            <LeaderboardRow key={'row' + i} rowNum={i+1} userInfo={this.props.usersInfo[i]} />
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
