const API_BASE_URL = 'http://weatherforecast.achipvn.com:3000/forecast/?idtram=tram1&yeuto=';

export const fetchDataChoose = async (yeuto) => {
    try {
      const response = await fetch(`${API_BASE_URL}${yeuto}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching data choose:', error);
      throw error;
    }
  };