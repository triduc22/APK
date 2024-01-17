import Axios from 'axios';

const fetchDataToday = async (locale, setWeatherData) => {
  try {
    const Today = await Axios.get(
      'http://weatherforecast.achipvn.com:3000/View2',
    );
    console.log('Today', Today?.data);
    setWeatherData(Today.data.data);
  } catch (error) {
    console.error('Today', error);
  }
};

export default fetchDataToday;
