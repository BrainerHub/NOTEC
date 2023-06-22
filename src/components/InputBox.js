import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {scale, theme} from '../utils';

const InputBox = props => {
  const {
    multiline,
    value,
    keyboardType,
    placeholder,
    secureTextEntry,
    onChangeText,
    numberOfLines,
    style,
    inputStyle,
    maxLength,
    onFocus,
    onBlur,
    fildIcon,
    onSubmitEditing,
    blurOnSubmit,
    returnKeyType,
    Img,
    passwordIcon,
    editable,
  } = props;
  const [showpassword, setShowpassword] = React.useState(false);
  return (
    <View style={[styles.inputContainer, style]}>
      {Img ? (
        <Icon1
          name={Img}
          size={scale(25)}
          color={theme.colors.black}
          style={{
            textAlignVertical: 'center',
            left: scale(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : null}
      {fildIcon ? (
        <Icon
          name={fildIcon}
          size={scale(15)}
          color={theme.colors.black}
          style={{
            textAlignVertical: 'center',
            marginLeft: scale(20),
            top: scale(-2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : null}
      <TextInput
        multiline={multiline}
        value={value}
        placeholderTextColor={theme.colors.black}
        keyboardType={keyboardType ? keyboardType : 'default'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={
          secureTextEntry ? (!showpassword ? secureTextEntry : false) : false
        }
        style={[styles.input, inputStyle]}
        maxLength={maxLength}
        editable={editable}
        numberOfLines={numberOfLines}
        blurOnSubmit={blurOnSubmit}
        textAlignVertical={props.textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        returnKeyType={returnKeyType}
        textContentType={'oneTimeCode'}
        onFocus={onFocus}
        onBlur={onBlur}
      />
  
      {passwordIcon && (
        <Icon
          name={!showpassword ? 'eye' : 'eye-off'}
          size={scale(18)}
          color={theme.colors.black}
          style={styles.icon}
          onPress={() => setShowpassword(!showpassword)}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: scale(30),
    marginBottom: scale(19),
    height: theme.SCREENHEIGHT * 0.068,
    backgroundColor: theme.colors.white,
    borderRadius: scale(15),
    flexDirection: 'row',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
    
  },
  icon: {
    marginRight: scale(10),
    alignSelf: 'center',
    right: 5,
  },
  input: {
    flex: 1,
    height: theme.SCREENHEIGHT * 0.068,
    paddingHorizontal: scale(8),
    fontSize: scale(14),
    color: theme.colors.black,
  },
  regex: {
    top: scale(10),
    right: 10,
    fontSize: scale(12),
  },
});

export default InputBox;
