import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiProvider } from '../../api/ApiProvider';

export function useHomeScreen () {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const storedData = await AsyncStorage.getItem('homeData');

      if (!storedData) {
        const responses = {
          quoteContent: await ApiProvider.getQuoteData(setData),
          triviaContent: await ApiProvider.getTriviaData(setData),
          factContent: await ApiProvider.getFactData(setData),
          dadJokeContent: await ApiProvider.getDadJokeData(setData),
          bucketListContent: await ApiProvider.getBucketListData(setData)
        }

        const stringValue = JSON.stringify(responses);
        AsyncStorage.setItem('homeData', stringValue).catch(console.error);
        setData(responses);
      }
      else {
        const jsonValue = JSON.parse(storedData);
        setData(jsonValue);
      }
    };

    fetchData()
      .catch(console.error)
  },[])

  return {
    data: Object.values(data)
  }
}