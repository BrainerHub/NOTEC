import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Image,

} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../components';
import {useDispatch} from 'react-redux';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {onBoarding} from '../redux/Actions/UserActions';
const OnboardingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigation.navigate('SignIn');
    dispatch(onBoarding(true));
  };

  const rnBiometrics = new ReactNativeBiometrics();

  return (
    <>
      <Onboarding
        onDone={handleNavigate}
        onSkip={handleNavigate}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../assets/Images/onboarding-img1.png')} />
            ),
            title: 'Take Notes',
            subtitle: 'Take notes and access them from Anywhere, Anytime',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../assets/Images/onboarding-img2.png')} />
            ),
            title: 'Stay Organised',
            subtitle: 'The digital note-taking app for your devices.',
          },
          
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
