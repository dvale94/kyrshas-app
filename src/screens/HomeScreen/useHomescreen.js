import { useState, useEffect } from 'react';

import { ApiProvider } from '../../api/ApiProvider';

export function useHomeScreen () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const jokeContent = ApiProvider.getJokeData();
    const quoteContent = ApiProvider.getQuoteData();
    const triviaContent = ApiProvider.getTriviaData();
    const factContent = ApiProvider.getFactData();
    const dadJokeContent = ApiProvider.getDadJokeData();
    const bucketListContent = ApiProvider.getBucketListData();

    Promise.all([ 
      quoteContent,
      jokeContent,
      factContent,
      dadJokeContent,
      bucketListContent,
      triviaContent
    ]).then((responses) => {
      setData(responses);
    });
  },[])

  return {
    data
  }
}