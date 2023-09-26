import api from './axiosConfigs';

export const ApiProvider = {
  getBackgroundImage: async function () {
    const response = 
      await api.request({
        url: `/randomimage?width=750&height=1334`,
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
    const quoteResponse =
      await api.request({
        url: `/quotes?category=happiness`,
        method: "GET",
      });

    const imageResponse = await this.getBackgroundImage();

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: imageResponse,
        text: JSON.parse(JSON.stringify(quoteResponse.data[0])).quote,
        title: 'quote'
      }
    );
  },
  getWordData: async function () {
    const wordResponse = await api.request({url: `/randomword`, method: "GET"});
    const word = JSON.parse(JSON.stringify(wordResponse.data)).word;

    let validResponse = false;
    let attempts = 0;
    let definitionResponse = undefined;
     
    while (validResponse == false && attempts < 3) {
      definitionResponse =
      await api.request({
        url: `/dictionary?word=${word}`,
        method: "GET",
      });

      console.log('fetched word!!')
      console.log(attempts)

      if (JSON.parse(JSON.stringify(definitionResponse.data)).valid == true) validResponse = true;
      attempts += 1;
    }

    const definition = JSON.parse(JSON.stringify(definitionResponse.data)).definition;

    return {
      id: Math.random().toString(36).substring(2, 9),
      image: '',
      text: `${word}: ${definition}`,
      title: 'word'
    }
  },
  getFactData: async function () {
    const factResponse = await api.request({url: `/facts`, method: "GET"});
    const imageResponse = await this.getBackgroundImage();

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
  getHistoricData: async function () {
    const historicResponse =
      await api.request({
        url: `/historicalevents?text=potter&offset=1`,
        method: "GET",
      });

    const imageResponse = await this.getBackgroundImage();

    return (
      {
        id: Math.random().toString(36).substring(2, 9),
        image: imageResponse,
        text: JSON.parse(JSON.stringify(historicResponse.data[0])).event,
        title: 'historic event'
      }
    );
  },
};