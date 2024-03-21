const images = [
  require('./images/kyrsha10.webp'),
  require('./images/kyrsha4.webp'),
  require('./images/kyrsha3.webp'),
  require('./images/kyrsha2.webp'),
  require('./images/kyrsha1.webp'),
  require('./images/kyrsha9.webp'),
  require('./images/kyrsha5.webp'),
  require('./images/kyrsha6.webp'),
  require('./images/kyrsha7.webp'),
  require('./images/kyrsha8.webp'),
];

const birthdayData = [
    {
      id: 'birthday',
      text: 'Happy birthday Kyrsha, to the woman who touches everyone with her cute giggle and loving personality! May your day shine as brightly as you do.',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'On your special day, I want to remind you of how incredible you are. Your love, strength, and growth are truly inspiring. Happy birthday Kyrsha, and keep shining!',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: "To the queen of sarcasm with a golden heart, may your birthday be as special as you are. Here's to celebrating you today and always. Love you Kyrsha!",
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'As you celebrate another year of life, may your heart be filled with the warmth of love, your days with endless laughter, and your path with endless opportunities. Happy birthday Kyrsha!',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: "On your special day, I want to express my gratitude for your friendship and the incredible person you are. Wishing you a birthday as wonderful as you've made my life.",
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'Happy birthday Kyrsha, heres to a woman who is not just a year older but a year wiser and more fabulous. May your day be as radiant as your spirit.',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'To the woman who adds color to my world and makes life more exciting, may your birthday be as vibrant and beautiful as you are. Cheers to another amazing year, Happy Birthday Kyrsha!',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'To a woman who brings sunshine into the lives of everyone around her, Happy Birthday! May your day be as radiant as your smile.',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: 'May your birthday be the start of a year filled with new adventures, dreams fulfilled, and endless joy. Happy Birthday Kyrsha!',
      title: 'happy birthday!!!',
    },
    {
      id: 'birthday',
      text: "Happy birthday to the one who makes life brighter with her presence. Your smile is contagious, and your kindness is boundless. Here's to a fantastic year ahead!",
      title: 'happy birthday!!!',
    }
]

export const getBirthdayData = function fetchData(setData) {

  return {
    ...birthdayData[Math.floor(Math.random() * birthdayData.length)],
    image: images[Math.floor(Math.random() * images.length)],
    onRefresh: async () => {
      const refreshedData = getBirthdayData(setData)
      setData(prev => ({...prev, birthdayContent: refreshedData}))
    }
  }
};