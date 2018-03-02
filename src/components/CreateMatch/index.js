import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import List from './components/List';
import { User } from './../UserList/';


class CreateMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filteredUsers: [],
            selectedOpponent: null,
        };

        this.selectOpponent = this.selectOpponent.bind(this);
    }

    filterUsers = (filterTerm) => {
        if (!filterTerm) {
            return [];
        }
        return this.props.users
            .filter((user) => (user.value.displayName.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
                &&
                user.key !== this.props.auth.uid  // do not select the auth user
            ))
    }

    handleChange = (event) => {
        const search = event.target.value;
        const users = this.filterUsers(search);
        this.setState({
            search,
            filteredUsers: users,
        });
    }

    selectOpponent = (user) => {
        this.setState({
            selectedOpponent: user,
            filteredUsers: [],
        });
    }

    showOpponent = () => {
        if (this.state.selectedOpponent) {
            return (
                <div>
                    {this.state.selectedOpponent.displayName}
                </div>
            );
        }
    }

    showUser = () => {
        if (isLoaded(this.props.auth) || !isEmpty(this.props.auth)) {
            return (
                <div>
                    {this.props.auth.displayName}
                </div>
            );
        }
    }

    createMatch = () => {
        this.props.firebase.push('/matches', { user1: this.props.auth, user2: this.state.selectedOpponent })
    }

    render() {
        return (
            <div>
                {this.showUser()}
                {this.showOpponent()}
                <input onChange={this.handleChange} value={this.state.search} type="text" />
                <List>
                    {this.state.filteredUsers && this.state.filteredUsers.map(
                        ({ key, value: user }) => (<User handleClick={this.selectOpponent} online={this.props.presence[key]} key={key} uid={key} {...user} />)
                    )}
                </List>

                <button onClick={this.createMatch} disabled={!this.state.selectedOpponent}>create show down</button>
            </div>
        );
    }
};

export default compose(
    firebaseConnect((props) => [
        { path: 'presence' },
        { path: 'users' },
        { path: 'auth' },
        { path: 'matches' },

    ]),
    connect((state, props) => ({
        presence: state.firebase.data.presence || {},
        users: state.firebase.ordered.users,
        auth: state.firebase.auth,
        matches: state.firebase.ordered.matches
    }))
)(CreateMatch);