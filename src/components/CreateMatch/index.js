import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { addMatch } from './../../actions/matches';
import Modal from './../shared/components/Modal';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';
import { SelectOpponent, FloatButton } from './styles';
import { Button } from './../shared/styles';

class CreateMatch extends Component {
  initialState = {
    search: '',
    filteredUsers: [],
    selectedOpponent: null,
    selectedOpponentUid: null,
    matchCreated: false,
    openModal: false,
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

  showOpponent = () => {
    if (this.state.selectedOpponent) {
      return <div>{this.state.selectedOpponent.displayName}</div>;
    }
  };

  showUser = () => {
    if (isLoaded(this.props.auth) || !isEmpty(this.props.auth)) {
      return <div>{this.props.auth.displayName}</div>;
    }
  };

  createMatch = () => {
    addMatch([this.props.auth.uid, this.state.selectedOpponentUid]).then(() => {
      this.setState({
        matchCreated: true,
        openModal: false,
      });
      console.log('match created');
    });
  };

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState(this.initialState);
  };

  render() {
    return (
      <Fragment>
        <FloatButton onClick={this.handleOpenModal} key="FloatButton">
          +
        </FloatButton>
        <Modal
          open={this.state.openModal ? 'open' : false}
          closeModal={this.handleCloseModal}
          key="CreateMatch"
          footer={
            <Button
              onClick={this.createMatch}
              disabled={!this.state.selectedOpponent}
            >
              create show down
            </Button>
          }
        >
          <div>
            {this.showUser()}
            {this.showOpponent()}
            <SelectOpponent matchCreated={this.state.matchCreated}>
              <input
                onChange={this.handleChange}
                value={this.state.search}
                type="text"
              />
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
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default compose(
  firebaseConnect(props => [{ path: 'users' }, { path: 'auth' }]),
  connect((state, props) => ({
    users: state.firebase.ordered.users,
    auth: state.firebase.auth,
  }))
)(EnrichCompetitors(CreateMatch));
