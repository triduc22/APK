import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native';
// import Axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fetchDataToday from '../api/ApiToday';
import {useTranslation} from 'react-i18next';

const WeatherToday = () => {
  const [weatherData, setWeatherData] = useState([]);

  //Process setup change image base time morning or evening
  const [daytimeImage, setDaytimeImage] = useState(
    require('../assets/images/sun1.png'),
  );
  const [nighttimeImage, setNighttimeImage] = useState(
    require('../assets/images/night.png'),
  );
  const [isDaytime, setIsDaytime] = useState(true);

  //Process make greeting(lời chào)
  const [isGreeting, setIsGreeting] = useState('');

  // const [locale, setLocale] = useState('en-US');

  //Process translate language
  const {t, i18n} = useTranslation();

  //Process to change language for week date after click VN
  const locale = i18n.language || 'en-US';

  // //Process date format VN
  // const [locale, setLocale] = useState('vi-VN');

  const loadData = useCallback(() => {
    fetchDataToday(locale, setWeatherData);
  }, [locale]);

  useEffect(() => {
    loadData();
    //Xly alway load data
    // Set up interval for continuous data refresh (adjust as needed)
    const intervalId = setInterval(() => {
      loadData();
    }, 1 * 60 * 1000); // Refresh every 10 minutes

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [loadData, locale]);

  //Process setup change image base time morning or evening
  useEffect(() => {
    const currentHour = new Date().getHours();
    const setIsDaytime = currentHour >= 6 && currentHour < 18;
    if (setIsDaytime) {
      setDaytimeImage(require('../assets/images/sun1.png'));
      setNighttimeImage(require('../assets/images/night.png'));
    } else {
      setDaytimeImage(require('../assets/images/night.png'));
      setNighttimeImage(require('../assets/images/sun1.png'));
    }
  }, [setIsDaytime]);

  //Process make greeting(lời chào)
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setIsGreeting(t('goodMorning'));
    } else if (currentHour >= 12 && currentHour < 18) {
      setIsGreeting(t('goodAfternoon'));
    } else {
      setIsGreeting(t('goodEvening'));
    }
  }, [t]);

  const getWeekFromDate = dateString => {
    const date = new Date(dateString);
    // const options = {weekday: 'long'};
    // translate to VN
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  const getTimeFromDate = dateString => {
    const date = new Date(dateString);
    const options = {hour: '2-digit', minute: '2-digit', hour12: false};
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  //When don't have translate language
  // useEffect(() => {
  //   // setLocale('en-US');
  //   setLocale('vi-VN');
  // }, []);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg3.jpg')}
        style={{position: 'absolute', height: '100%', width: '100%'}}
      />

      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.infor}>
            {/* <Text style={styles.title_infor}>THỜI TIẾT HÔM NAY,</Text> */}
            <Text style={styles.title_infor}>{t('titleinfor')}</Text>
            {/* <Text style={styles.title_infor1}> TP.Thủ Đức</Text> */}
            <Text style={styles.title_infor1}>{t('titleinfor1')}</Text>
          </View>
          <View style={styles.image}>
            {/* <Image
              style={styles.image1}
              source={require('../assets/images/sun1.png')}
            /> */}

            {/* Process setup change image base time morning or evening */}
            <Image
              style={styles.image1}
              source={isDaytime ? daytimeImage : nighttimeImage}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(1),
            }}>
            <View style={styles.inforDegree}>
              {weatherData.map((item, index) => (
                <View key={index}>
                  {item && (
                    <React.Fragment>
                      <Text style={styles.inforDegreeText}>
                        {parseFloat(item.temperature).toFixed(1)} {''}
                        °C
                        {/* °c */}
                      </Text>
                      <Text style={styles.infoDateText}>
                        {getWeekFromDate(item.date_time)}
                        {/* {getWeekFromDate(item.date_time) +
                          ' ' +
                          getTimeFromDate(item.date_time)} */}
                      </Text>

                      {/* Process make greeting(lời chào) */}
                      <Text style={styles.title_greeting}>{isGreeting}</Text>

                      {/* Xly hàng trên*/}
                      {/* <View style={{width: 500, height: 100, marginTop: hp(3)}}> */}
                      <View
                        style={{
                          width: 500,
                          height: hp(12.5),
                          marginTop: hp(3),
                        }}>
                        <View style={styles.containInforWindSpeed}>
                          <View style={styles.contain1InforWindSpeed}>
                            <Image
                              source={require('../assets/icons/windspeed.gif')}
                              // style={{height: 26, width: 29}}
                              style={{height: 27.5, width: 32}}
                            />
                            <Text style={styles.inforWindSpeed}>
                              {parseFloat(item.windspeed).toFixed(1)} Km/h
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containInforWindGust}>
                          <View style={styles.contain1InforWindGust}>
                            <Image
                              source={require('../assets/icons/wind.gif')}
                              // style={{height: 24, width: 24}}
                              style={{height: 27.5, width: 32}}
                            />
                            <Text style={styles.inforWindGust}>
                              {parseFloat(item.windGust).toFixed(1)} Km/h
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containInforHumidity}>
                          <View style={styles.contain1InforHumidity}>
                            <Image
                              source={require('../assets/icons/drop.gif')}
                              // style={{height: 24, width: 24}}
                              style={{height: 25, width: 30}}
                            />
                            <Text style={styles.inforHumidity}>
                              {parseFloat(item.humidity).toFixed(1)} RH
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Process hàng duới*/}
                      <View style={{width: 500, height: 100}}>
                        <View style={styles.containInforPressure}>
                          <View style={styles.contain1InforPressure}>
                            <Image
                              source={require('../assets/icons/pressure.gif')}
                              // style={{height: 24, width: 24}}
                              style={{height: 27.5, width: 32}}
                            />
                            <Text style={styles.inforPressure}>
                              {parseFloat(item.pressure).toFixed(1)} Atm
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containInforUV}>
                          <View style={styles.contain1InforUV}>
                            <Image
                              source={require('../assets/icons/uv7.gif')}
                              // style={{height: 28, width: 27}}
                              style={{height: 28, width: 32}}
                            />
                            <Text style={styles.inforUV}>
                              {parseFloat(item.uv).toFixed(0)} W/m^2
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containInforTemperature}>
                          <View style={styles.contain1InforTemperature}>
                            <Image
                              source={require('../assets/icons/clock.gif')}
                              // style={{height: 25, width: 25}}
                              style={{height: 27.9, width: 28}}
                            />
                            <Text style={styles.inforTemperature}>
                              {getTimeFromDate(item.date_time)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </React.Fragment>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default WeatherToday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 85,
    marginVertical: wp(3),
    marginVertical: wp(20),
    position: 'relative',
  },

  container1: {
    marginRight: wp(6),
    marginLeft: wp(6),
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    alignContent: 'flex-start',
    marginTop: wp(-7),
  },

  infor: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: hp(-5),
  },

  title_infor: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
  },

  title_infor1: {
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '600',
    // color: 'rgb(209, 213, 219)',
    color: '#000',
    marginLeft: wp(1),
    marginRight: wp(-4),
    alignSelf: 'center',
  },

  image: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },

  image1: {
    marginRight: wp(1),
    marginLeft: wp(1.5),
    // width: 208,
    // height: 208,
    width: wp(59),
    height: hp(30),
  },

  inforDegree: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    marginHorizontal: wp(24),
  },

  inforDegreeText: {
    textAlign: 'center',
    fontWeight: '700',
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontSize: 40,
    marginLeft: wp(7),
    marginRight: wp(1),
  },

  infoDateText: {
    textAlign: 'center',
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: hp(5),
    marginBottom: hp(2),
    letterSpacing: 0.1,
    marginLeft: wp(27),
    marginRight: wp(20),
  },

  title_greeting: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: hp(4),
    fontWeight: '700',
    marginLeft: wp(25),
    marginRight: wp(22),
  },

  // Xly hàng trên
  containInforWindSpeed: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(30.6),
    marginRight: wp(35.6),
  },

  contain1InforWindSpeed: {
    flexDirection: 'row',
    marginLeft: wp(1),
    marginRight: wp(90),
  },

  inforWindSpeed: {
    width: wp(50),
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(2),
  },

  containInforWindGust: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(5.8),
    // marginVertical: wp(-6.9),
    marginVertical: hp(-3.4),
  },

  contain1InforWindGust: {
    flexDirection: 'row',
    marginLeft: wp(1),
  },

  inforWindGust: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(2),
  },

  containInforHumidity: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: wp(-1.9),
  },
  contain1InforHumidity: {
    flexDirection: 'row',
    marginLeft: wp(74),
    paddingVertical: wp(1.8),
  },

  inforHumidity: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(1),
  },

  // Xly hang duoi
  containInforPressure: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(30.6),
    marginRight: wp(35.6),
  },

  contain1InforPressure: {
    flexDirection: 'row',
    marginLeft: wp(1),
    marginRight: wp(92),
    marginVertical: wp(-10),
  },

  inforPressure: {
    width: wp(50),
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(3),
  },

  containInforUV: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: wp(8.5),
    marginVertical: wp(-6.2),
  },

  contain1InforUV: {
    flexDirection: 'row',
    marginLeft: wp(-3),
    marginVertical: wp(-4.6),
  },

  inforUV: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 30,
    marginHorizontal: wp(2),
  },

  containInforTemperature: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: wp(-1.9),
  },
  contain1InforTemperature: {
    flexDirection: 'row',
    marginLeft: wp(72.5),
    paddingVertical: wp(2.3),
    marginVertical: wp(2),
  },

  inforTemperature: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: wp(2),
  },
});
