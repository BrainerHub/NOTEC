import React from 'react';
import MianStack from './navigation/MianStack';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {Appearance, LogBox} from 'react-native';

export default App = () => {
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MianStack />
      </PersistGate>
    </Provider>
  );
};
