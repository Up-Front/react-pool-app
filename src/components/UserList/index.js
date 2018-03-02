import React from 'react'
import styled from 'styled-components'

const Avatar = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-start;
  background:white;
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
  background:rgba(255,255,255,0.5);
  padding:10px;
`

export const User = ({ avatarUrl, displayName, email, online, handleClick }) => {
  const handleClickEvent = (event) => {
    if (typeof handleClick === 'function') {
      handleClick({
        avatarUrl,
        displayName,
        email
      });
    }
  }
  return (
    <Avatar onClick={handleClickEvent}>
      <div><AvatarImage height='64' width='64' src={avatarUrl} /></div>
      <div>
        <strong>{online ? '✳️' : '✴️'}{displayName}</strong>
        <div>{email}</div>
      </div>
    </Avatar>
  );
}