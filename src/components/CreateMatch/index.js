import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
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
            .filter((user) => (user.value.displayName.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1))
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

    render() {
        return (
            <div>
                {this.showOpponent()}
                <input onChange={this.handleChange} value={this.state.search} type="text" />
                <List>
                    {this.state.filteredUsers && this.state.filteredUsers.map(
                        ({ key, value: user }) => (<User handleClick={this.selectOpponent} online={this.props.presence[key]} key={key} {...user} />)
                    )}
                </List>
            </div>
        );
    }
};


export default compose(
    firebaseConnect((props) => [
        { path: 'presence' },
        { path: 'users' },
        { path: 'matches' },

    ]),
    connect((state, props) => ({
        presence: state.firebase.data.presence || {},
        users: state.firebase.ordered.users,
        matches: state.firebase.ordered.matches
    }))
)(CreateMatch);