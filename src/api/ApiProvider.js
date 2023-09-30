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
  getJokeData: async function () {
    const response = await api.request({url: `/jokes`, method: "GET"})

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: '',
        text: JSON.parse(JSON.stringify(response.data[0])).joke,
        title: 'joke'
      }
    )
  },
  getQuoteData: async function () {
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
        id: Math.random().toString(36).substring(2, 9),
        image: imageResponse,
        text: `"${JSON.parse(JSON.stringify(quoteResponse.data[0])).quote}"`,
        author: JSON.parse(JSON.stringify(quoteResponse.data[0])).author,
        title: 'quote'
      }
    );
  },
  getTriviaData: async function () {
    const categories = ['entertainment', 'general', 'historyholidays', 'fooddrink'];
    const random = Math.floor(Math.random() * categories.length);

    const triviaResponse =
      await api.request({
        url: `trivia?category=${categories[random]}`,
        method: "GET",
      });

    return {
      id: Math.random().toString(36).substring(2, 9),
      image: '',
      text: JSON.parse(JSON.stringify(triviaResponse.data[0])).question,
      answer: JSON.parse(JSON.stringify(triviaResponse.data[0])).answer,
      title: 'trivia'
    }
  },
  getFactData: async function () {
    const factResponse = await api.request({url: `/facts`, method: "GET"});
    const imageResponse = await this.getBackgroundImage('abstract');

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: imageResponse,
        text: JSON.parse(JSON.stringify(factResponse.data[0])).fact,
        title: 'fact'
      }
    );
  },
  getDadJokeData: async function () {
    const response = await api.request({url: `/dadjokes`, method: "GET"})

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: '',
        text: JSON.parse(JSON.stringify(response.data[0])).joke,
        title: 'dad joke'
      }
    )
  },
  getBucketListData: async function () {
    const bucketListResponse =
      await api.request({
        url: `/bucketlist`,
        method: "GET",
      });

    const imageResponse = await this.getBackgroundImage('abstract');

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: imageResponse,
        text: JSON.parse(JSON.stringify(bucketListResponse.data)).item,
        title: 'bucket list item'
      }
    );
  },
};