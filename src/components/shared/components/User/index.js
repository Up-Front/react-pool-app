import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from './../Avatar';
import RankingDetail from './../RankingDetail';
import { UserWrapper, UserEloRating } from './styles';

class User extends Component {
  handleClickEvent = () => {
    if (typeof this.props.handleClick === 'function') {
      this.props.handleClick(this.props.uid, this.props.user);
    }
  };

  render() {
    return (
      <UserWrapper onClick={this.handleClickEvent}>
        <RankingDetail
          currentRanking={this.props.user.currentRanking}
          previousRanking={this.props.user.previousRanking}
        />
        <Avatar user={this.props.user} />
        <div>
          <strong>{this.props.user.displayName}</strong>
          <UserEloRating data-test="elorating">
            points: <span>{this.props.user.currentRanking.eloRating}</span>
          </UserEloRating>
        </div>
      </UserWrapper>
    );
  }
}
User.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default User;
