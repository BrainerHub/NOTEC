import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {scale, theme} from '../utils';
import {Label} from './index';
import ICON from 'react-native-vector-icons/Ionicons';
const Button = props => {
  const {onPress, style, title, titleStyle, Icon} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttoncontainer, styles.shadow, style]}>
      {Icon && (
        <ICON
          name={Icon}
          size={scale(28)}
          color={theme.colors.black}
          style={{left: scale(2)}}
        />
      )}
      <Text style={[styles.buttontxt, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    justifyContent: 'center',
    marginHorizontal: scale(35),
    backgroundColor: theme.colors.white,
    width: theme.SCREENWIDTH - scale(70),
    alignSelf: 'center',
    borderRadius: scale(18),
    alignItems: 'center',
    marginBottom: scale(13),
    flexDirection: 'row',
    height: theme.SCREENHEIGHT * 0.068,
  },
  buttonImage: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    left: scale(-10),
    alignSelf: 'center',
  },
  buttontxt: {
    fontSize: scale(15),
    color: theme.colors.black,
  },
  title: {color: theme.colors.blue, textAlign: 'center'},
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default Button;
