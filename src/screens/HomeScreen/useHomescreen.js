import { useState, useEffect, useMemo } from 'react';

import { ApiProvider } from '../../api/ApiProvider';
import { getBirthdayData } from './birthdayData/data';

export function useHomeScreen () {
  const [data, setData] = useState({});
  const date = useMemo(() => new Date());

  useEffect(() => {
    async function fetchData() {
      const month = date.getMonth();
      const day = date.getDate();
      const apiCalls = [];
      const order = [];
      const responses = {};

      if (month === 9 && day === 3) {
        order.push('birthdayContent');
        apiCalls.push(getBirthdayData(setData));
      }

      const apiFunctions = [
        { name: 'quoteContent', func: ApiProvider.getQuoteData },
        { name: 'triviaContent', func: ApiProvider.getTriviaData },
        { name: 'factContent', func: ApiProvider.getFactData },
        { name: 'dadJokeContent', func: ApiProvider.getDadJokeData },
        { name: 'bucketListContent', func: ApiProvider.getBucketListData }
      ];

      for (const { name, func } of apiFunctions) {
        order.push(name);
        apiCalls.push(func(setData));
      }

      const results = await Promise.all(apiCalls);

      for (let i = 0; i < order.length; i++) {
        responses[order[i]] = results[i];
      }

      setData(responses);
      
    };

    fetchData().catch(console.error)
  },[])

  return {
    data: Object.values(data)
  }
}