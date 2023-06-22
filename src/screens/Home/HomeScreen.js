import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NoteScreen from './NoteScreen';
import {useSelector} from 'react-redux';
import {theme} from '../../utils';

export default HomeScreen = () => {
  const userInfo = useSelector(state => state.UserReducer);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}}>
      <NoteScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
