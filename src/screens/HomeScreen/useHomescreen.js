import { useState, useEffect } from 'react';

import { ApiProvider } from '../../api/ApiProvider';

export function useHomeScreen () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const jokeContent = ApiProvider.getJokeData();
    const quoteContent = ApiProvider.getQuoteData();
    const wordContent = ApiProvider.getWordData();
    const factContent = ApiProvider.getFactData();
    const dadJokeContent = ApiProvider.getDadJokeData();
    const historicContent = ApiProvider.getHistoricData();

    Promise.all([ 
      jokeContent, 
      quoteContent,
      wordContent,
      factContent,
      dadJokeContent,
      historicContent
    ]).then((responses) => {
      setData(responses);
    });
  },[])

  return {
    data
  }
}