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
  getJoke: async function () {
    const response = await api.request({url: `/jokes`, method: "GET"})
    return JSON.parse(JSON.stringify(response.data[0]))
  }
};