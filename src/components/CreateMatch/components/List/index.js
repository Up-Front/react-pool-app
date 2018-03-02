import React from 'react';

const List = (props) => {
    const showUserList = (users = []) => {
        return users.map((user) => (
            <li key={user.id}>
                {user.name}
            </li>
        )
        );
    }

    return (
        <div>
            <h4>choose your victim!</h4>
            <ul>
                {showUserList(props.users)}
            </ul>
        </div >
    );
};

export default List;