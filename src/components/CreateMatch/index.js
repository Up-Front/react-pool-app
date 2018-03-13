import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { addMatch } from './../../actions/matches';
import Modal from './../shared/components/Modal';
import List from './components/List';
import { User } from './../UserList/';
import { SelectOpponent, FloatButton } from './styles';
import { Button } from './../shared/styles';

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = this.initalState();
    this.selectOpponent = this.selectOpponent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  initalState = () => ({
    search: '',
    filteredUsers: [],
    selectedOpponent: null,
    matchCreated: false,
    openModal: false
  });

  filterUsers = filterTerm => {
    if (!filterTerm || !this.props.users) {
      return [];
    }
    return Object.values(this.props.users).filter(
      user =>
        user.value.displayName.toLowerCase().indexOf(filterTerm.toLowerCase()) >
          -1 && user.key !== this.props.auth.uid // do not select the auth user
    );
  };

  handleChange = event => {
    const search = event.target.value;
    const users = this.filterUsers(search);
    this.setState({
      search,
      filteredUsers: users
    });
  };

  selectOpponent = user => {
    this.setState({
      selectedOpponent: user,
      filteredUsers: []
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
    addMatch([this.props.auth.uid, this.state.selectedOpponent.uid]).then(
      () => {
        this.setState({
          matchCreated: true
        });
        this.handleCloseModal();
        console.log('match created');
      }
    );
  };

  handleOpenModal = () => {
    this.setState({
      openModal: true
    });
  };

  handleCloseModal = () => {
    this.setState(this.initalState());
  };

  render() {
    return [
      <FloatButton onClick={this.handleOpenModal} key="FloatButton">
        +
      </FloatButton>,
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
            <List>
              {this.state.filteredUsers &&
                this.state.filteredUsers.map(({ key, value: user }) => (
                  <User
                    handleClick={this.selectOpponent}
                    online={this.props.presence[key]}
                    key={key}
                    uid={key}
                    {...user}
                  />
                ))}
            </List>
          </SelectOpponent>
        </div>
      </Modal>
    ];
  }
}

export default compose(
  firebaseConnect(props => [
    { path: 'presence' },
    { path: 'users' },
    { path: 'auth' },
    { path: 'matches' }
  ]),
  connect((state, props) => ({
    presence: state.firebase.data.presence || {},
    users: state.firebase.ordered.users,
    auth: state.firebase.auth,
    matches: state.firebase.ordered.matches
  }))
)(CreateMatch);
