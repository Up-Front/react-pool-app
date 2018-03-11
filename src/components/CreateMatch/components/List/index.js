import React from 'react';

const List = props => {
  return (
    <div>
      <h4>choose your victim!</h4>
      <ul>{props.children}</ul>
    </div>
  );
};

export default List;
