import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import fetchDataDetails from '../api/ApiDetails';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useTranslation} from 'react-i18next';

import {Picker} from '@react-native-picker/picker';

const WeatherDetail = () => {
  const [weatherData1, setWeatherData1] = useState([]);
  // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

  //Process translate language
  const {t, i18n} = useTranslation();

  const [locale1, setLocale1] = useState('vi-VN');

  // Process for filter selection
  const [selectedOption, setSelectedOption] = useState('All');

  const loadData1 = useCallback(() => {
    fetchDataDetails(locale1, setWeatherData1);
  }, [locale1]);

  useEffect(() => {
    loadData1();
    //Xly alway load data
    // Set up interval for continuous data refresh (adjust as needed)
    const intervalId = setInterval(() => {
      loadData1();
    }, 1 * 60 * 1000); // Refresh every 10 minutes

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [loadData1, locale1]);

  useEffect(() => {
    // setLocale('en-US');
    setLocale1('vi-VN');
  }, []);

  // Process for Filter selection
  const filteredData =
    selectedOption === 'All' ? weatherData1 : weatherData1.slice(0, 1);
  selectedOption === '1' ? weatherData1.slice(0, 1) : weatherData1;

  return (
    <View style={styles.container}>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg3.jpg')}
        style={{position: 'absolute', height: '100%', width: '100%'}}
      />

      <View style={styles.containerDetail}>
        <View style={styles.containerDetail1}>
          <View style={styles.inforDetail}>
            <Text style={styles.title_inforDetail}>{t('titleinfor')}</Text>
            <Text style={styles.title_inforDetail1}>{t('titleinfor1')}</Text>
          </View>
        </View>

        {/* Process for filter choosen */}
        <View style={styles.filterContainer}>
          {/* Process for Filter selection */}
          <Text style={styles.filterLabel}>{t('filterSelection')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={itemValue => setSelectedOption(itemValue)}
              dropdownIconColor="black"
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label={t('All')} value="All"/>
              <Picker.Item label="1" value="1" />
            </Picker>
          </View>
        </View>

        <ScrollView horizontal style={styles.ScrollViewContainer}>
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <Text
                style={[
                  styles.headerText,
                  {
                    width: 100,
                    marginHorizontal: wp(2),
                    paddingHorizontal: wp(6),
                  },
                ]}>
                {t('Date')}
              </Text>
              {/* <Text style={[styles.headerText, {width: 95}]}>Date</Text> */}
              <Text
                style={[
                  styles.headerText,
                  {
                    width: 70,
                    paddingHorizontal: wp(2),
                    marginHorizontal: wp(3),
                  },
                ]}>
                {t('Time')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(1),
                    marginHorizontal: wp(1),
                  },
                ]}>
                {t('Wind Speed')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(1),
                    marginHorizontal: wp(5),
                  },
                ]}>
                {t('Wind Gust')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(1),
                    marginHorizontal: wp(5),
                  },
                ]}>
                {t('Temperature1')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(1),
                    marginHorizontal: wp(5),
                  },
                ]}>
                {t('Humidity')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 140,
                    paddingHorizontal: wp(2),
                    marginHorizontal: wp(2),
                  },
                ]}>
                {t('Pressure')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(2),
                    marginHorizontal: wp(2),
                  },
                ]}>
                {t('DailyRain')}
              </Text>

              <Text
                style={[
                  styles.headerText,
                  {
                    width: 150,
                    paddingHorizontal: wp(5.5),
                    marginHorizontal: wp(2),
                  },
                ]}>
                {t('UV')}
              </Text>
            </View>

            {/* Process Data from Api */}
            <FlatList
              // Process for Filter selection
              data={filteredData}
              // data={weatherData1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.dataTableRow}>
                  <Text
                    style={{
                      color: '#000',
                      width: 90,
                      marginHorizontal: wp(2),
                      paddingHorizontal: wp(1),
                      fontSize: 14,
                      fontWeight: '600',
                      // marginHorizontal: 2.5
                    }}>
                    {/* Get the date from api*/}
                    {item.datex.split(' ')[0]}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(5.5),
                      fontSize: 14,
                      fontWeight: '600',
                      // paddingHorizontal: 25
                    }}>
                    {/* Process time from the date */}
                    {item.datex.split(' ')[2]}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(1),
                      // marginLeft: wp(-5),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.windspeed}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(3.5),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.windGust}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(6.5),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.temperature}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(12.5),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.humidity}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 105,
                      marginHorizontal: wp(15),
                      paddingHorizontal: wp(3.5),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.pressure}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 105,
                      marginHorizontal: wp(2),
                      paddingHorizontal: wp(2),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.dailyrain}
                  </Text>

                  <Text
                    style={{
                      color: '#000',
                      width: 150,
                      paddingHorizontal: wp(12),
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.dailyrain}
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  containerDetail: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginVertical: 85,
    // marginVertical: wp(20),
    // position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(3),
    marginVertical: wp(20),
    position: 'relative',
  },

  containerDetail1: {
    // marginRight: wp(6),
    // marginLeft: wp(6),
    // flex: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'flex-start',
    // marginTop: wp(-7),
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

  inforDetail: {
    // flexDirection: 'row',
    // display: 'flex',
    // justifyContent: 'center',
    // marginTop: hp(-5),
    // marginHorizontal: wp(10),
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: hp(-5),
  },

  title_inforDetail: {
    // color: 'rgb(255, 255, 255)',
    color: '#000',
    textAlign: 'center',
    // fontSize: 24,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
  },
  title_inforDetail1: {
    // fontSize: 20,
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '600',
    // color: 'rgb(209, 213, 219)',
    color: '#000',
    marginLeft: wp(1),
    marginRight: wp(-4),
    alignSelf: 'center',
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   // paddingVertical: 30,
  //   // paddingHorizontal: 20,
  //   paddingVertical: hp(20),
  //   paddingHorizontal: wp(5),
  //   marginBottom: hp(10),

  // },

  ScrollViewContainer: {
    width: '100%',
    marginHorizontal: wp(1),
  },

  listContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    // paddingVertical: hp(3),
    // paddingHorizontal: wp(5),
    marginBottom: hp(48),
  },

  header: {
    flexDirection: 'row',
    paddingVertical: hp(2),
    marginLeft: wp(2.5),
    marginRight: wp(2.5),
    // paddingVertical: 10,
    // paddingVertical: 10,
    borderBottomWidth: 1,
    // borderBottomColor: '#e1e1e1',
    borderBottomColor: 'rgb(75, 85, 99)',
  },

  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    // color: 'white',
    color: '#000',
    borderRightWidth: 1,
    // borderRightColor: '#e1e1e1',
    borderBottomColor: 'rgb(75, 85, 99)',
    marginHorizontal: wp(8),
  },

  dataTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 8,
    // marginHorizontal: 1,
    // elevation: 1,
    // borderRadius: 3,
    // paddingVertical: 10,
    marginVertical: hp(2),
    marginHorizontal: wp(2.5),
    elevation: 1,
    borderRadius: 3,
    paddingVertical: hp(1.4),
    // backgroundColor: '#fff',
    // backgroundColor: 'rgb(156, 163, 175)'
    backgroundColor: 'rgb(229, 229, 229)',
  },

  filterContainer: {
    width: wp(86),
    // width: wp(78),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.5),
    // marginHorizontal: wp(23),
    marginLeft: wp(14.5),
    marginRight: wp(9.5),
  },

  filterLabel: {
    fontSize: 16.5,
    fontWeight: '700',
    marginRight: wp(2),
    color: '#000',
  },

  picker: {
    flex: 1,
    height: hp(2),
    borderWidth: 1,
    borderColor: 'gray',
    color: '#000',
  },

  pickerContainer: {
    flex: 1,
    height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden', 
  },
});
