import React, { Component } from 'react';
import timeago from 'timeago.js';
import { parseUserInfo } from './utils.js';
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
  showMoreUserInfo(username, image, target) {

    let row = target;
    while (row.tagName !== 'TR') {
      row = row.parentElement;
    }

    var el = document.getElementById('more-info');
    if (el !== null) {
      var tr = el.parentElement;
      var table = tr.parentElement;
      table.removeChild(tr);
    }

    var newElement = document.createElement('tr');
    row.parentNode.insertBefore(newElement, row.nextSibling);
    newElement.innerHTML = `<td id="more-info" style="word-break: break-all;" colspan="6">
      <div id="more-info-div" style="overflow: hidden; transition: height 1s;">
        Loading...
      </div>
    </td>`;

    parseUserInfo(username).then(function(json) {
      let html = '<div  class="more-info-top">';
      html += '<img class="more-info-image" alt="' + username + ' profile Image" src="' + image + '" /><br>';
      html += '<span class="more-info-name">' + (json.realName ? json.realName : username) + '</span>';
      html += json.location ? ' <span class="more-info-location">' + json.location + '</span>' : '';
      html += '<br>';
      for (let key in json.socialLinks) {
        html += '<a class="social-' + key + '" href="' + json.socialLinks[key] + '" target="_blank">' + key + '</a> ';
      }
      html += json.bio ? '<br><div class="more-info-bio"><hr>' + json.bio + '<hr></div>' : '';
      html += json.longestStreak ? '<br>' + json.longestStreak : '';
      html += json.currentStreak ? '<br>' + json.currentStreak : '';
      if (json.projects.length > 0) {
        html += '<br><br>'
        for (let i = 0; i < json.projects.length; i++) {
          html += json.projects[i].link ? '<a href="' + json.projects[i].link + '" target="_blank">' + json.projects[i].title + '</a><br>' : '';
        }
      }

      html += '</div>';

      document.getElementById('more-info-div').innerHTML = html;

    }, function(err) {
      console.log('DOMParse error: ' + err);
      document.getElementById('more-info-div').innerHTML = 'Something went wrong';
    })
  }

  render() {
    return(
      <tr onClick={(e) => this.showMoreUserInfo(this.props.userInfo.username, this.props.userInfo.img, e.target)}>
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
