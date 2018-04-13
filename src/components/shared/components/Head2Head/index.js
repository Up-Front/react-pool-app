import React from 'react';
import { calcHead2Head } from './../../../../actions/competitors';
import {Head2HeadWrapper} from './styles';

const Head2Head = ({competitorA, competitorB}) => {

  return (
    <Head2HeadWrapper>
      { calcHead2Head(competitorA, competitorB) }
    </Head2HeadWrapper>
  );
}

export default Head2Head;