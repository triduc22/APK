import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar, Text, View, TouchableOpacity} from 'react-native';
import {getCurrentLanguage, setLanguage} from '../translations/i18n';
import {useTranslation} from 'react-i18next';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import WeatherToday from '../screens/WeatherToday';
import WeatherForecast from '../screens/WeatherForecast';
import WeatherDetail from '../screens/WeatherDetails';
import WeatherAbout from '../screens/WeatherAbout';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="gray" />
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={({route}) => ({
          //Process change color icon in tabBar
          tabBarInactiveTintColor: '#000',
          tabBarActiveTintColor: '#000',

          tabBarIcon: ({focused, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Today') {
              iconName = focused ? 'today' : 'today-outline';
            } else if (rn === 'ForeCast') {
              iconName = focused ? 'umbrella' : 'umbrella-outline';
            } else if (rn === 'Details') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === 'About') {
              iconName = focused ? 'information' : 'information-outline';
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? '#33cccc' : '#000'}
              />
            );
          },
        })}>
        <Tab.Screen
          name="Today"
          component={WeatherToday}
          options={{
            headerTitle: () => (
              <View style={{flex: 1}}>
                <View style={{display: 'flex'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View>
                      <Text
                        style={{
                          width: wp(50),
                          fontSize: wp(5),
                          fontWeight: '700',
                          padding: wp(1.5),
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginLeft: wp(1),

                          marginTop: wp(2.5),
                        }}>
                        {t('homeToday')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          paddingTop: wp(2),
                          marginLeft: wp(10),
                        }}>
                        {t('titleLanguage')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        getCurrentLanguage() === 'vi'
                          ? setLanguage('en')
                          : setLanguage('vi')
                      }>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginHorizontal: wp(34),
                          padding: wp(1.5),

                          marginTop: wp(2.5),
                        }}>
                        {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ),
          }}
        />

        {/* Process ForeCast Weather Screen */}
        <Tab.Screen
          name="ForeCast"
          component={WeatherForecast} 
          options={{
            headerTitle: () => (
              <View style={{flex: 1}}>
                <View style={{display: 'flex'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View>
                      <Text
                        style={{
                          width: wp(50),
                          fontSize: wp(5),
                          fontWeight: '700',
                          padding: wp(1.5),
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginLeft: wp(1),

                          marginTop: wp(2.5),
                        }}>
                        {t('homeForecast')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          paddingTop: wp(2),
                          marginLeft: wp(10),
                        }}>
                        {t('titleLanguage')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        getCurrentLanguage() === 'vi'
                          ? setLanguage('en')
                          : setLanguage('vi')
                      }>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginHorizontal: wp(34),
                          padding: wp(1.5),

                          marginTop: wp(2.5),
                        }}>
                        {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ),
          }}
        />

        {/* Process Details Weather Screen */}
        <Tab.Screen
          name="Details"
          component={WeatherDetail}
          options={{
            headerTitle: () => (
              <View style={{flex: 1}}>
                <View style={{display: 'flex'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View>
                      <Text
                        style={{
                          width: wp(50),
                          fontSize: wp(5),
                          fontWeight: '700',
                          padding: wp(1.5),
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginLeft: wp(1),

                          marginTop: wp(2.5),
                        }}>
                        {t('homeDetails')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          paddingTop: wp(2),
                          marginLeft: wp(10),
                        }}>
                        {t('titleLanguage')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        getCurrentLanguage() === 'vi'
                          ? setLanguage('en')
                          : setLanguage('vi')
                      }>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginHorizontal: wp(34),
                          padding: wp(1.5),
                          marginTop: wp(2.5),
                        }}>
                        {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ),
          }}
        />

        {/* Process About Weather Screen */}
        <Tab.Screen
          name="About"
          component={WeatherAbout}
          options={{
            headerTitle: () => (
              <View style={{flex: 1}}>
                <View style={{display: 'flex'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View>
                      <Text
                        style={{
                          width: wp(50),
                          fontSize: wp(5),
                          fontWeight: '700',
                          padding: wp(1.5),
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginLeft: wp(1),

                          marginTop: wp(2.5),
                        }}>
                        {t('homeAbout')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          paddingTop: wp(2),
                          marginLeft: wp(10),
                        }}>
                        {t('titleLanguage')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        getCurrentLanguage() === 'vi'
                          ? setLanguage('en')
                          : setLanguage('vi')
                      }>
                      <Text
                        style={{
                          width: wp(550),
                          fontSize: wp(5),
                          fontWeight: '700',
                          // color: '#4F8EF7',
                          // color: '#007aff',
                          color: '#000',
                          marginHorizontal: wp(34),
                          padding: wp(1.5),
                          marginTop: wp(2.5),
                        }}>
                        {getCurrentLanguage() === 'vi' ? 'EN' : 'VN'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ),
          }}
        />

        {/* <Tab.Screen name="ForeCast" component={WeatherForecast} /> */}
        {/* <Tab.Screen name="Details" component={WeatherDetail} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
