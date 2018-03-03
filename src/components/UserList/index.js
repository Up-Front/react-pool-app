import React from 'react'
import styled from 'styled-components'
import { Pulse, FadeIn } from 'animate-css-styled-components';

const Avatar = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-start;
  background:${props => props.position === 0 ? 'linear-gradient(to right, #f9d423 0%, #ff4e50 100%)' : 'white'};
  padding: 10px;
  border-radius:8px;
`

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin:10px;
`

export const UserList = styled.div`
  display:grid;
  grid-gap:10px;
  padding:10px;
`

export const Score = styled.div`
  margin:10px;
  font-weight:bold;
  color:black;
  font-size:200%;
  min-width:100px;
  text-align:center;
`

export const User = ({ avatarUrl, displayName, email, online, handleClick, uid, score, position }) => {
  const handleClickEvent = (event) => {
    if (typeof handleClick === 'function') {
      handleClick({
        uid,
        avatarUrl,
        displayName,
        email
      });
    }
  }
  return (
    <FadeIn delay={`${position ? position / 5.0 : 0}s`}>
      <Pulse iterationCount="infinite" duration={position === 0 ? '1s' : '0s'}>
        <Avatar onClick={handleClickEvent} position={position}>
          <div><AvatarImage height='64' width='64' src={avatarUrl} /></div>
          <div>
            <strong>{online ? '✳️' : '✴️'}{displayName}</strong>
            <div>{email}</div>
          </div>
        </Avatar>
      </Pulse>
    </FadeIn>
  );
}

