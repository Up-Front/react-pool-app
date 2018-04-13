import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { addMatch } from './../../actions/matches';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';
import {
  SelectOpponent,
  SearchField,
  SearchResult,
  SearchClear,
} from './styles';
import { Button, InputField } from './../shared/styles';

class CreateMatch extends Component {
  initialState = {
    search: '',
    filteredUsers: [],
    selectedOpponent: null,
    selectedOpponentUid: null,
  };
  state = this.initialState;

  filterUsers = filterTerm => {
    if (!filterTerm || !this.props.users) {
      return [];
    }
    return this.props.users.filter(
      user =>
        user.displayName.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1 &&
        user.uid !== this.props.auth.uid // do not select the auth user
    );
  };

  handleChange = event => {
    const search = event.target.value;
    const users = this.filterUsers(search);
    this.setState({
      search,
      filteredUsers: users,
    });
  };

  selectOpponent = (uid, user) => {
    this.setState({
      selectedOpponent: user,
      selectedOpponentUid: uid,
      filteredUsers: [],
    });
  };

  opponentSelected = () => {
    return this.state.selectedOpponent;
  };

  removeOpponent = () => {
    this.setState(this.initialState);
  };

  showOpponent = () => {
    if (this.state.selectedOpponent) {
      return (
        <SearchResult>
          <User user={this.state.selectedOpponent} />
          <SearchClear onClick={this.removeOpponent} />
        </SearchResult>
      );
    }
  };

  createMatch = () => {
    addMatch([this.props.auth.uid, this.state.selectedOpponentUid]).then(() => {
      this.setState(this.initialState);
      console.log('match created');
    });
  };

  render() {
    return (
      <Fragment>
        <SearchField>
          {this.showOpponent()}
          <InputField
            innerRef={x => (this.searchInput = x)}
            type="text"
            onChange={this.handleChange}
            placeholder="Select your victim"
            value={this.state.search}
            hide={this.opponentSelected()}
          />
          <Button
            disabled={!this.opponentSelected()}
            onClick={this.createMatch}
          >
            create show down
          </Button>
        </SearchField>
        <SelectOpponent
          show={
            (this.state.filteredUsers && this.state.filteredUsers.length > 0) ||
            this.state.selectedOpponent
          }
        >
          {this.state.filteredUsers &&
            this.state.filteredUsers
              .sort((a, b) => -(a.eloRating - b.eloRating))
              .map(user => (
                <User
                  handleClick={this.selectOpponent}
                  online={this.props.presence[user.uid]}
                  key={user.uid}
                  uid={user.uid}
                  user={user}
                />
              ))}
        </SelectOpponent>
      </Fragment>
    );
  }
}

export default compose(
  firebaseConnect(props => [
    { path: 'users' },
    {
      path: 'rankings',
      queryParams: ['orderByKey', 'limitToLast=2'],
    },
    { path: 'auth' },
  ]),
  connect(({ firebase }) => {
    return {
      users: firebase.ordered.users,
      rankings: firebase.ordered.rankings,
      auth: firebase.auth,
    };
  })
)(EnrichCompetitors(CreateMatch));
