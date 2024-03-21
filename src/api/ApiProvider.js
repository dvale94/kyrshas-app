import api from './axiosConfigs';

const parseApiResponse = (response) => {
  return JSON.parse(JSON.stringify(response.data[0]));
};

export const ApiProvider = {
  getBackgroundImage: async function (category) {
    const response = await api.request({
      url: `/randomimage?category=${category}&width=375&height=667`,
      method: "GET",
    })
    return response.data
  },
  getQuoteData: async function (setData) {
    const categories = ['courage', 'dreams', 'happiness', 'inspirational', 'life', 'love'];
    const random = Math.floor(Math.random() * categories.length);
    const imageResponse = await ApiProvider.getBackgroundImage('nature');

    const quoteResponse =
      await api.request({
        url: `/quotes?category=${categories[random]}`,
        method: "GET",
      });

    const quoteData = parseApiResponse(quoteResponse);

    return (
      {
        id: 'quote',
        image: imageResponse,
        text: `"${quoteData.quote}"`,
        author: quoteData.author,
        title: 'quote',
        onRefresh: async () => {
          const refreshedData = await ApiProvider.getQuoteData(setData)
          setData(prev => ({...prev, quoteContent: refreshedData}))
        }
      }
    );
  },
  getTriviaData: async function (setData) {
    const categories = ['entertainment', 'general', 'historyholidays', 'fooddrink'];
    const random = Math.floor(Math.random() * categories.length);

    const triviaResponse = await api.request({
      url: `trivia?category=${categories[random]}`,
      method: "GET",
    });

    const triviaData = parseApiResponse(triviaResponse);

    return {
      id: 'trivia',
      image: '',
      text: triviaData.question,
      answer: triviaData.answer,
      title: 'trivia',
      onRefresh: async () => {
        const refreshedData = await ApiProvider.getTriviaData(setData)
        setData(prev => ({...prev, triviaContent: refreshedData}))
      }
    }
  },
  getFactData: async function (setData) {
    const factResponse = await api.request({url: `/facts`, method: "GET"});
    const imageResponse = await ApiProvider.getBackgroundImage('abstract');
    const factData = parseApiResponse(factResponse);

    return (
      {
        id: 'fact',
        image: imageResponse,
        text: factData.fact,
        title: 'fact',
        onRefresh: async () => {
          const refreshedData = await ApiProvider.getFactData(setData)
          setData(prev => ({...prev, factContent: refreshedData}))
        }
      }
    );
  },
  getDadJokeData: async function (setData) {
    const dadJokeResponse = await api.request({url: `/dadjokes`, method: "GET"})
    const dadJokeData = parseApiResponse(dadJokeResponse);

    return (
      {
        id: 'dad joke',
        image: '',
        text: dadJokeData.joke,
        title: 'dad joke',
        onRefresh: async () => {
          const refreshedData = await ApiProvider.getDadJokeData(setData)
          setData(prev => ({...prev, dadJokeContent: refreshedData}))
        }
      }
    )
  },
  getBucketListData: async function (setData) {
    const bucketListResponse =
      await api.request({
        url: `/bucketlist`,
        method: "GET",
      });

    const imageResponse = await ApiProvider.getBackgroundImage('abstract');

    return (
      {
        id: 'bucket list item',
        image: imageResponse,
        text: JSON.parse(JSON.stringify(bucketListResponse.data)).item,
        title: 'bucket list item',
        onRefresh: async () => {
          const refreshedData = await ApiProvider.getBucketListData(setData)
          setData(prev => ({...prev, bucketListContent: refreshedData}))
        }
      }
    );
  },
};