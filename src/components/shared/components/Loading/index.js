import React from 'react';
import { Rotate } from './styles';

const Loading = () => (
  <Rotate>
    <span role="img" aria-label="left hand">
      👈
    </span>
    <span role="img" aria-label="8-ball">
      🎱
    </span>
    <span role="img" aria-label="right hand">
      👉
    </span>
  </Rotate>
);

export default Loading;
