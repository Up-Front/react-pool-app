import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { enrichCompetitor } from './../../../../actions/competitors';
import constants from './../../constants';

const EnrichCompetitors = Component => {
  const enrichCompetitorData = props => {
    if (props.users) {
      return Object.values(props.users).map(user => {
        user.value.uid = user.key;
        user.value.eloRating =
          user.value.eloRating || constants.DEFAULTELORATING;
        return enrichCompetitor({
          competitor: user.value,
          presence: props.presence,
          rankings: props.rankings,
        });
      });
    }
    return {};
  };

  const BaseComponent = props => {
    const newProps = Object.assign({}, props, {
      users: enrichCompetitorData(props),
    });
    return <Component {...newProps} />;
  };
  return compose(
    firebaseConnect(props => [
      { path: 'presence' },
      {
        path: 'rankings',
        queryParams: ['orderByKey', 'limitToLast=2'],
      },
    ]),
    connect(({ firebase }) => {
      return {
        presence: firebase.data.presence || {},
        rankings: firebase.ordered.rankings,
      };
    })
  )(BaseComponent);
};

export default EnrichCompetitors;
