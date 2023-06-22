import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../utils';
import * as Animatable from 'react-native-animatable';

const RoundIcon = props => {
  const {style, onPress, name, animation} = props;
  return (
    <Animatable.View animation={animation}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            backgroundColor: theme.colors.purpal,
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <AntDesign name={name} size={30} color="white" style={{}} />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default RoundIcon;

const styles = StyleSheet.create({});
