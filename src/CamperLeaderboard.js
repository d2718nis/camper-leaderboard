import React, { Component } from 'react';
import './CamperLeaderboard.css';

class CamperLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: {
        allTime: null,
        recent: null
      },
      sortByAllTime: true
    };
  }

  componentWillMount() {
    this.setState({
      leaderboard: {
        allTime: this.props.usersInfo.allTime,
        recent: this.props.usersInfo.recent
      }
    });
  }

  handleClick(targetAllTime) {
    // XOR hack
    if (targetAllTime !== this.state.sortByAllTime) {
      this.setState({
        sortByAllTime: !this.state.sortByAllTime
      });
    }
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
          <LeaderboardTable
            onClick={(targetAllTime) => this.handleClick(targetAllTime)}
            usersInfo={this.state.sortByAllTime ?
              this.state.leaderboard.allTime :
              this.state.leaderboard.recent
            }
          />
        </div>
      );
    }
  }
}

class LeaderboardTable extends Component {
  renderRow(i) {
    return(
      <LeaderboardRow
        key={'row' + i}
        rowNum={i+1}
        userInfo={this.props.usersInfo[i]}
      />
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Num</td>
            <td>Image</td>
            <td>Name</td>
            <td>
              <a href="#" onClick={() => this.props.onClick(true)}>All time</a>
            </td>
            <td>
              <a href="#" onClick={() => this.props.onClick(false)}>Recent</a>
            </td>
            <td>Last update</td>
          </tr>
        </thead>
        <tbody>
          {Array(this.props.usersInfo.length).fill(null).map((val, i) => this.renderRow(i))}
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
        <td>
          <img alt={this.props.userInfo.username + ' profile Image'} width="30" src={this.props.userInfo.img} />
        </td>
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
