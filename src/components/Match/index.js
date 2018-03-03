import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { GetMatch } from './../../actions/matches';

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: {}
        }
    }


    render() {
        console.log(this.props);
        return (
            <div>
                Match info
            </div >
        );
    }
}

const populates = [
    { child: 'competitors', root: 'users' } // replace owner with user object
];


const enhance = compose(
    firebaseConnect((props) => [
        { path: '/matches', queryParams: ['orderByKey', 'limitToFirst=1', `equalTo=${props.match.params.matchId}`], populates }
    ]),
    connect(({ firebase }) => ({
        matches: populate(firebase, 'matches', populates),
    }))
);

export default enhance(Match);