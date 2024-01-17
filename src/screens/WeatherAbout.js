import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';


const WeatherAbout = () => {

    //Process translate language
    const {t} = useTranslation();
 
  const [studentInfo] = useState({
    name: 'Tri Duc',
    role: 'role',
    contribution: 'contribution',
  });
 
  const [studentInfo1] = useState({
    name1: 'Van Bang',
    role1: 'role1',
    contribution1: 'contribution1',
  });

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        blurRadius={70}
        source={require('../assets/images/bg3.jpg')}
        style={{position: 'absolute', height: '100%', width: '100%'}}
      />
      <Text style={styles.title}>{t('studentInformation')}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Name')}</Text>
        <Text style={styles.value}>{t('studentInfo.name')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Role')}</Text>
        <Text style={styles.value0}>{t('studentInfo.role')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Contribution')}</Text>
        <Text style={styles.value1}>{t('studentInfo.contribution')}</Text>
      </View>

      {/* Bang */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Name')}</Text>
        <Text style={styles.value}>{t('studentInfo1.name1')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Role')}</Text>
        <Text style={styles.value}>{t('studentInfo1.role1')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('Contribution')}</Text>
        <Text style={styles.value}>{t('studentInfo1.contribution1')}</Text>
      </View>
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    width: wp(150),
    // marginHorizontal: wp(20),
    paddingHorizontal: wp(23),
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginTop: hp(5),
    marginBottom: 25,
  },
  infoContainer: {
    flex: 1,
    width: wp(250),
    marginHorizontal: wp(2),
    marginBottom: hp(5),
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
    marginTop: 4
  },
  value: {
    width: wp(100),
    fontSize: 17,
    fontWeight: '400',
    lineHeight: hp(4),
    color: '#000',
    // marginVertical: 4.5,
  },
  value0: {
    width: wp(98),
    fontSize: 17,
    fontWeight: '400',
    lineHeight: hp(4),
    color: '#000',
    // marginVertical: 4.5,
  },
  value1: {
    width: wp(98),
    fontSize: 17,
    fontWeight: '400',
    lineHeight: hp(4),
    color: '#000',
    // paddingHorizontal: wp(1),
    marginRight: wp(16)
    // marginVertical: 4.5,
  },
});

export default WeatherAbout;
