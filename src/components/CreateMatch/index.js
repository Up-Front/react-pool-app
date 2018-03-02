import React, { Component } from 'react';
import List from './components/List';

const users = [
    {
        id: '1',
        name: 'Steven',

    },
    {
        id: '2',
        name: 'Maurits'
    }
];


class CreateMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            users,
            filteredUsers: [],
        };
    }

    filterUsers = (filterTerm) => {
        if (!filterTerm) {
            return [];
        }
        return this.state.users.filter((user) => (user.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1));
    }

    handleChange = (event) => {
        const search = event.target.value;
        const users = this.filterUsers(search);
        this.setState({
            search,
            filteredUsers: users,
        });
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange} value={this.state.search} type="text" />
                <List users={this.state.filteredUsers} />
            </div>
        );
    }
};

export default CreateMatch;