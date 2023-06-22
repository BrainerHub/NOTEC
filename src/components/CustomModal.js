import { StyleSheet} from 'react-native';
import React, {Children} from 'react';
import * as Animatable from 'react-native-animatable';
import {theme} from '../utils';

const CustomModal = props => {
  const {ModalHeight, children} = props;
  return (
    <Animatable.View
      animation="zoomIn"
      style={{
        backgroundColor: theme.colors.lightpurpal,
        height: ModalHeight,
        borderRadius: 20,
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 25,
        alignItems: 'center',
      }}>
      {children}
    </Animatable.View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
