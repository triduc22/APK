import React, {useEffect} from 'react';
import MainContainer from './src/navigation/MainContainer';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';


function App() {
  //Xly Splash Screen
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);



  return  <MainContainer />;
}

export default App;
