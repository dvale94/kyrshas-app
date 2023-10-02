import api from './axiosConfigs';

export const ApiProvider = {
  getBackgroundImage: async function (category) {
    
    const response = 
      await api.request({
        url: `/randomimage?category=${category}&width=375&height=667`,
        method: "GET",
      })
    
    return response.data
  },
  getQuoteData: async function (setData) {
    const categories = ['courage', 'dreams', 'happiness', 'inspirational', 'life', 'love'];
    const random = Math.floor(Math.random() * categories.length);

    const quoteResponse =
      await api.request({
        url: `/quotes?category=${categories[random]}`,
        method: "GET",
      });

    const imageResponse = await this.getBackgroundImage('nature');

    return (
      {
        id: 'quote',
        image: imageResponse,
        text: `"${JSON.parse(JSON.stringify(quoteResponse.data[0])).quote}"`,
        author: JSON.parse(JSON.stringify(quoteResponse.data[0])).author,
        title: 'quote',
        onRefresh: async () => {
          const refreshedData = await this.getQuoteData(setData)
          setData(prev => ({...prev, quoteContent: refreshedData}))
        }
      }
    );
  },
  getTriviaData: async function (setData) {
    const categories = ['entertainment', 'general', 'historyholidays', 'fooddrink'];
    const random = Math.floor(Math.random() * categories.length);

    const triviaResponse =
      await api.request({
        url: `trivia?category=${categories[random]}`,
        method: "GET",
      });

    return {
      id: 'trivia',
      image: '',
      text: JSON.parse(JSON.stringify(triviaResponse.data[0])).question,
      answer: JSON.parse(JSON.stringify(triviaResponse.data[0])).answer,
      title: 'trivia',
      onRefresh: async () => {
        const refreshedData = await this.getTriviaData(setData)
        setData(prev => ({...prev, triviaContent: refreshedData}))
      }
    }
  },
  getFactData: async function (setData) {
    const factResponse = await api.request({url: `/facts`, method: "GET"});
    const imageResponse = await this.getBackgroundImage('abstract');

    return (
      {
        id: 'fact',
        image: imageResponse,
        text: JSON.parse(JSON.stringify(factResponse.data[0])).fact,
        title: 'fact',
        onRefresh: async () => {
          const refreshedData = await this.getFactData(setData)
          setData(prev => ({...prev, factContent: refreshedData}))
        }
      }
    );
  },
  getDadJokeData: async function (setData) {
    const response = await api.request({url: `/dadjokes`, method: "GET"})

    return (
      {
        id: 'dad joke',
        image: '',
        text: JSON.parse(JSON.stringify(response.data[0])).joke,
        title: 'dad joke',
        onRefresh: async () => {
          const refreshedData = await this.getDadJokeData(setData)
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

    const imageResponse = await this.getBackgroundImage('abstract');

    return (
      {
        id: 'bucket list item',
        image: imageResponse,
        text: JSON.parse(JSON.stringify(bucketListResponse.data)).item,
        title: 'bucket list item',
        onRefresh: async () => {
          const refreshedData = await this.getBucketListData(setData)
          setData(prev => ({...prev, bucketListContent: refreshedData}))
        }
      }
    );
  },
};