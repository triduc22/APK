import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {fetchDataForeCast} from '../api/ApiForecast';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

//Process change upcase the first letter
const toTitleCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
const WeatherForecast = () => {
  const [weatherData2, setWeatherData2] = useState([]);
  // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

  const [selectedItem, setSelectedItem] = useState();
  const [selectedValue, setSelectedValue] = useState('temperature');

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  //Process translate language
  const {t, i18n} = useTranslation();

  //Process make drop downmenu
  const menuItems = [
    {key: 'temperature', label: t('Temperature')},
    {key: 'uv', label: t('UV1')},
    {key: 'rainfall', label: t('Rainfall')},
    {key: 'windgust', label: t('Windgust')},
  ];

  //Process change picture when click text in picker
  const images = {
    // temperature: require('../assets/images/temperature.png'),
    temperature: require('../assets/images/temperature.png'),
    uv: require('../assets/images/uv.png'),
    rainfall: require('../assets/images/rainfall.png'),
    windgust: require('../assets/images/wind.png'),
  };

  const images1 = {
    temperature: require('../assets/icons/temperature.gif'),
    uv: require('../assets/icons/uv7.gif'),
    rainfall: require('../assets/icons/rain3.gif'),
    windgust: require('../assets/icons/wind.gif'),
  };

  //Process always refresh to get new data
  // Function to fetch data and update state
  const fetchData = async () => {
    try {
      const result = await fetchDataForeCast(selectedValue);
      setWeatherData2(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Process translate language
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  //Use this to always show data when open app
  useEffect(() => {
    handleMenuItemClick(menuItems.find(item => item.key === selectedValue));

    //Process translate language
    const formattedDate = currentDate.toLocaleDateString(
      i18n.language,
      options,
    );
    setSelectedDate(formattedDate);

    //Xly alway load data
    // Set up interval for continuous data refresh (adjust as needed)
    const intervalId = setInterval(() => {
      fetchData();
    }, 1 * 60 * 1000); // Refresh every 10 minutes

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedValue, i18n.language]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleMenuItemClick(item)}>
      <View
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <Text>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  // //Process call api when click
  const handleMenuItemClick = async item => {
    setSelectedItem(item.key);

    try {
      const result = await fetchDataForeCast(item.key);
      setWeatherData2(result);

      //Process Plus 10 minutes for all
      // const updatedDate = new Date(currentDate.getTime() + 10 * 60000);

      // Process get time based on the selected item
      let updatedDate;
      if (item.key === 'rainfall' || item.key === 'windgust') {
        // Plus 10 minutes
        updatedDate = new Date(currentDate.getTime() + 10 * 60000);
      } 
      else {
        // Plus 1 hour
        updatedDate = new Date(currentDate.getTime() + 60 * 60000);
      }
      
     

      

      // Process show time with Vietnamese time
      const optionstime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      // Process before add 10plus for all
      // const formattedTime = currentDate.toLocaleTimeString(
      //   'vi-VN',
      //   optionstime,
      // );

      //Process Plus 10 minutes for all
      const formattedTime = updatedDate.toLocaleTimeString(
        'vi-VN',
        optionstime,
      );

      //Process show date with vietnamese
      setSelectedTime(formattedTime);

      console.log('List', result);
    } catch (error) {
      // Handle error
      console.error('Error list dropdown menu item click:', error);
    }
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg3.jpg')}
        style={{position: 'absolute', height: '100%', width: '100%'}}
      />

      <View
        style={{
          height: hp(7),
          width: wp(60),
          marginHorizontal: wp(20),
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          // marginTop: hp(45),
          marginVertical: hp(4),
          alignItems: 'center',
          backgroundColor: '#fff',
          borderWidth: 1.8,
          borderRadius: 20,
        }}>
        <Picker
          selectedValue={selectedValue}
          style={styles.pickers}
          mode="dropdown"
          dropdownIconColor="black" // Change color of the arrow pointing down
          onValueChange={itemValue => {
            setSelectedValue(itemValue);
          }}>
          {menuItems.map(item => (
            <Picker.Item
              style={{fontSize: 20}}
              key={item.key}
              label={item.label}
              value={item.key}
            />
          ))}
        </Picker>
      </View>

      {selectedItem && (
        <View>
          <Text
            style={{
              // color: '#fff',
              color: '#000',
              fontSize: 19.5,
              fontWeight: 600,
              alignSelf: 'center',
            }}>
            {/* {`Dự Báo ${selectedItem}`.toUpperCase()} */}
            {/* {`Dự Báo ${toTitleCase(selectedItem)}`} */}
            {`${t('Dự Báo')} ${t(toTitleCase(selectedItem))}`.toUpperCase()}
          </Text>

          <View style={styles.image}>
            <Image style={styles.image1} source={images[selectedItem]} />
          </View>

          <Text
            style={{
              // color: '#fff',
              color: '#000',
              fontSize: 19,
              fontWeight: 600,
              alignSelf: 'center',
              marginVertical: hp(5),
            }}>
            {/* {`${selectedDate}`.toUpperCase()} */}
            {`${selectedDate}`}
          </Text>

          <FlatList
            //Tắt scrollable
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={weatherData2}
            renderItem={({item}) => (
              <View
                style={{
                  width: wp(100),
                  height: hp(100),
                  marginTop: hp(5),
                  marginHorizontal: hp(1),
                  // marginTop: hp(2),
                }}>
                <View style={styles.containInforStation}>
                  <View style={styles.contain1InforStation}>
                    <Image
                      source={require('../assets/icons/station1.gif')}
                      style={{height: 26, width: 32}}
                    />
                    <Text style={styles.inforStation}>
                      {toTitleCase(item.idtram)}
                    </Text>
                  </View>
                </View>

                <View style={styles.containInforTemperature}>
                  <View style={styles.contain1InforTemperature}>
                    <Image
                      // source={require('../assets/icons/rainsensor.png')}
                      source={images1[selectedItem]}
                      // style={{height: 26, width: 29}}
                      style={{height: 26.2, width: 34.5}}
                    />
                    <Text style={styles.inforTemperature}>
                      {parseFloat(item.predict_result).toFixed(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.containInforTime}>
                  <View style={styles.contain1InforTime}>
                    <Image
                      source={require('../assets/icons/clock.gif')}
                      style={{height: 26.5, width: 25}}
                    />
                    <Text style={styles.inforTime}>
                      {`${selectedTime}`.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => `${item.date}-${index}`} // Combination of date and index
            // keyExtractor={(item) => item.date} // Combination of date and index
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
    // marginLeft: wp(2),
    // marginRight: wp(15)
  },

  image1: {
    // marginRight: wp(2),
    // marginLeft: wp(2),
    marginRight: wp(1),
    marginLeft: wp(1),
    width: 208,
    height: 208,
  },

  containInforStation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(30.6),
    marginRight: wp(35.6),
    marginTop: hp(-3),
  },

  contain1InforStation: {
    flexDirection: 'row',
    marginLeft: wp(5.5),
    marginRight: wp(97),
    marginVertical: hp(1.8),
    paddingVertical: hp(1.5),
  },

  inforStation: {
    width: wp(50),
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(1),
  },

  containInforTemperature: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(-2),
    marginRight: wp(1),
  },

  contain1InforTemperature: {
    flex: 1,
    flexDirection: 'row',
    // marginLeft: wp(42),
    // marginTop: hp(-9),
    marginLeft: wp(40),
    marginTop: hp(-8.8),
    // marginVertical: hp(-10),
    paddingVertical: hp(2.2),
  },

  inforTemperature: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25,
    // marginHorizontal: wp(2),
    marginHorizontal: wp(1),
  },

  containInforTime: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: hp(0.2),
    marginVertical: hp(0.7),
    paddingVertical: hp(1),
  },
  contain1InforTime: {
    flexDirection: 'row',
    marginLeft: wp(72),
    // paddingVertical: hp(-1),
    marginVertical: hp(-8.3),
  },

  inforTime: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(2),
  },

  pickers: {
    height: 50,
    width: 200,
    // color: '#fff',
    color: 'black',
    // paddingVertical: hp(10),
    // marginBottom: hp(10),
    marginLeft: wp(3),
    marginRight: wp(5),
  },
});

export default WeatherForecast;
