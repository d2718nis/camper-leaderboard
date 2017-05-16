import React, { Component } from 'react';
import timeago from 'timeago.js';
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
            sortByAllTime={this.state.sortByAllTime}
          />
        </div>
      );
    }
  }
}

class LeaderboardTable extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: ''
    }
  }

  renderRow(i) {
    return(
      <LeaderboardRow
        key={'row' + i}
        rowNum={i+1}
        userInfo={this.props.usersInfo[i]}
      />
    );
  }

  handleFilter(val) {
    this.setState({
      filterValue: val
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Picture</td>
            <td>
              <input
                name="name-search"
                placeholder="Name"
                onChange={(e) => this.handleFilter(e.target.value)}
                type="text"
              />
            </td>
            <td className={this.props.sortByAllTime ? 'sort-by' : ''}>
              <a href="#" onClick={() => this.props.onClick(true)}>All time&#8595;</a>
            </td>
            <td className={this.props.sortByAllTime ? '' : 'sort-by'}>
              <a href="#" onClick={() => this.props.onClick(false)}>Recent&#8595;</a>
            </td>
            <td>Last activity</td>
          </tr>
        </thead>
        <tbody>
          {Array(this.props.usersInfo.length).fill(null).map((val, i) => {
            if (this.state.filterValue.length > 0) {
              const filterValue = new RegExp(this.state.filterValue.toLowerCase());
              const username = this.props.usersInfo[i].username.toLowerCase();
              if (filterValue.test(username)) {
                return this.renderRow(i)
              }
            } else {
              return this.renderRow(i);
            }
            return null;
          })}
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
          <img alt={this.props.userInfo.username + ' profile Image'} src={this.props.userInfo.img} />
        </td>
        <td>
          <a href={'https://www.freecodecamp.com/' + this.props.userInfo.username} target="_blank">
            {this.props.userInfo.username}
          </a>
        </td>
        <td>{this.props.userInfo.alltime}</td>
        <td>{this.props.userInfo.recent}</td>
        <td>{timeago().format(this.props.userInfo.lastUpdate)}</td>
      </tr>
    );
  }
}

export default CamperLeaderboard;
