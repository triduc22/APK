import Axios from 'axios';

const fetchDataDetails = async (locale1, setWeatherData1) => {
  try {
    const Details = await Axios.get(
      'http://weatherforecast.achipvn.com:3000/View',
    );
    console.log('Details', Details?.data);
    setWeatherData1(Details.data.data);
  } catch (error) {
    console.error('Details', error);
  }
};

export default fetchDataDetails;
