import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiProvider } from '../../api/ApiProvider';

export function useHomeScreen () {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const storedData = await AsyncStorage.getItem('homeData');

      if (!storedData) {
        console.log('not stored')
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
          const stringValue = JSON.stringify(responses);
          AsyncStorage.setItem('homeData', stringValue).catch(console.error);
          setData(responses);
        });
      }
      else {
        console.log('stored')
        const jsonValue = JSON.parse(storedData);
        setData(jsonValue);
      }
    };

    fetchData()
      .catch(console.error)
  },[])

  return {
    data
  }
}