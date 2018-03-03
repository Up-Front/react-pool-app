import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { GetMatch } from './../../actions/matches';

class Match extends Component {
    constructor(props) {
        super(props);
    }

    renderMatch() {
        if ((isLoaded(this.props.matches) && !isEmpty(this.props.matches))) {
            const match = this.props.matches[this.props.match.params.matchId];

            return Object.keys(match.competitors).map(function (key) {
                const competitor = match.competitors[key];
                return (
                    <div key={key}>
                        {competitor.displayName}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                Match info
                {this.renderMatch()}
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