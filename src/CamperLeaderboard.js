import React, { Component } from 'react';
import { format } from 'timeago.js';
import './CamperLeaderboard.css';

class CamperLeaderboard extends Component {
  constructor() {
    super();
    this.state = {
      leaderboard: {
        allTime: null,
        recent: null
      },
      sortByAllTime: true,
      sortAllTimeDesc: true,
      sortRecentDesc: true
    };
  }

  componentWillMount() {
    if (this.props.usersInfo !== null) {
      this.setState({
        leaderboard: {
          allTime: this.props.usersInfo.allTime,
          recent: this.props.usersInfo.recent
        }
      });
    }
  }

  handleClick(targetAllTime) {
    // XOR hack
    if (targetAllTime !== this.state.sortByAllTime) {
      this.setState({
        sortByAllTime: !this.state.sortByAllTime
      });
    } else {
      if (targetAllTime) {
        this.setState({
          sortAllTimeDesc: !this.state.sortAllTimeDesc
        });
      } else {
        this.setState({
          sortRecentDesc: !this.state.sortRecentDesc
        });
      }
    }
  }

  render() {
    if (this.props.usersInfo === null) {
      return (
        <div className="CamperLeaderboardContainer">
          <h1>Camper Leaderboard</h1>
          <p>An error occured</p>
        </div>
      );
    } else {
      return (
        <div className="CamperLeaderboardContainer">
          <div className="CamperLeaderboardHead">
            <h1>Camper Leaderboard</h1>
          </div>
          <div className="CamperLeaderboardBody">
            <LeaderboardTable
              onClick={(targetAllTime) => this.handleClick(targetAllTime)}
              usersInfo={this.state.sortByAllTime ?
                this.state.leaderboard.allTime :
                this.state.leaderboard.recent
              }
              sortByAllTime={this.state.sortByAllTime}
              sortAllTimeDesc={this.state.sortAllTimeDesc}
              sortRecentDesc={this.state.sortRecentDesc}
            />
          </div>
          <div className="CamperLeaderboardBottom credits">
            <a className="credits-link" href="https://d2718nis.github.io" target="_blank">May 2017 by Denis Z.</a>
          </div>
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
    const filterValue = new RegExp(this.state.filterValue.toLowerCase());
    const username = this.props.usersInfo[i].username.toLowerCase();
    if (filterValue.test(username)) {
      return(
        <LeaderboardRow
          key={'row' + i}
          rowNum={i+1}
          userInfo={this.props.usersInfo[i]}
        />
      );
    }
    return null;
  }

  renderTBody() {
    let result = [];
    if ((this.props.sortByAllTime && this.props.sortAllTimeDesc) ||
      (!this.props.sortByAllTime && this.props.sortRecentDesc)) {
      for (let i = 0; i < this.props.usersInfo.length; i++) {
        result.push(this.renderRow(i));
      }
    } else {
      for (let i = this.props.usersInfo.length - 1; i > -1; i--) {
        result.push(this.renderRow(i));
      }
    }
    return result;
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
              <div className="filter-container">
                <input
                  name="name-search"
                  placeholder="Name"
                  onChange={(e) => this.handleFilter(e.target.value)}
                  type="text"
                />
                <span className="icon-search"></span>
              </div>
            </td>
            <td className={this.props.sortByAllTime ? 'sort-by' : ''}>
              <a href="#" onClick={() => this.props.onClick(true)}>
                {'All time' + (this.props.sortAllTimeDesc ? '↓' : '↑')}
              </a>
            </td>
            <td className={this.props.sortByAllTime ? '' : 'sort-by'}>
              <a href="#" onClick={() => this.props.onClick(false)}>
                {'Recent' + (this.props.sortRecentDesc ? '↓' : '↑')}
              </a>
            </td>
            <td>Last activity</td>
          </tr>
        </thead>
        <tbody>
          {this.renderTBody()}
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
        <td>{format(this.props.userInfo.lastUpdate)}</td>
      </tr>
    );
  }
}

export default CamperLeaderboard;
