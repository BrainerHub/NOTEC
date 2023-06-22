import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import UserAvatar from 'react-native-user-avatar';
import {scale, theme} from '../../utils';
import {InputBox, Label, Header} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from '../../components/CustomIcon';
import {useDispatch} from 'react-redux';
import {
  isLogin,
  logout,
  userData,
  deleteAccount,
} from '../../redux/Actions/UserActions';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {usersCollection} from '../../utils/FirebaseServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationActions} from 'react-navigation';
import {CommonActions, useNavigation} from '@react-navigation/native';

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {userInfo} = route.params;
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(userInfo?.first_name);
  const [lastName, setLastName] = useState(userInfo?.last_name);
  const dispatch = useDispatch();
  const showAlert = () =>
    Alert.alert('Are you sure, you want to Logout ?', null, [
      {
        text: 'Cancel',
        cancelable: true,
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(logout());
          dispatch(isLogin(false));

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'SignIn'}],
            }),
          );
        },
      },
    ]);

  const deleteAlert = () =>
    Alert.alert('Are you sure, You want to delete account ?', null, [
      {
        text: 'Cancel',
        cancelable: true,
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteAccount());
          dispatch(isLogin(false));
          navigation.navigate('SignIn');
        },
      },
    ]);

  const handleEdit = () => {
    let updateUser = userInfo;
    updateUser.first_name = firstName;
    updateUser.last_name = lastName;
    let userId = userInfo._id;
    if (edit) {
      try {
        usersCollection
          .doc(userId)
          .update(updateUser)
          .then(data => {
            alert('User Details updated.');
          });
        usersCollection.doc(userId).onSnapshot(documentSnapshot => {
          dispatch(userData(documentSnapshot.data()));
        });
      } catch (error) {}
    }
    setEdit(!edit);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <Header onPress={() => navigation.goBack()} HeaderTitle="Profile" />
      <Icon
        name={edit ? 'check' : 'edit'}
        size={scale(25)}
        style={{alignSelf: 'flex-end', right: scale(20), marginTop: scale(15)}}
        onPress={() => {
          handleEdit();
        }}
      />
      <UserAvatar
        size={50}
        name={userInfo?.first_name}
        style={styles.UserAvatar}
      />
      <View style={{marginTop: '8%'}}>
        <Label title={'First name'} style={styles.lbl} />
        <InputBox
          value={firstName}
          style={styles.textInput}
          inputStyle={styles.inputStyle}
          editable={edit}
          onChangeText={txt => {
            setFirstName(txt);
          }}
        />
        <Label title={'Last name'} style={styles.lbl} />
        <InputBox
          value={lastName}
          style={styles.textInput}
          placeholder="Last name"
          inputStyle={styles.inputStyle}
          editable={edit}
          onChangeText={txt => {
            setLastName(txt);
          }}
        />
        <Label title={'Email'} style={styles.lbl} />
        <InputBox
          value={userInfo?.email}
          style={styles.textInput}
          placeholder="Email"
          inputStyle={styles.inputStyle}
          editable={false}
        />
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.row} onPress={showAlert}>
          <Icon name="power" size={scale(20)} color={theme.colors.red} />
          <Label title={' Logout'} style={{color: theme.colors.red}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={deleteAlert}>
          <Icon1 name="delete" size={scale(20)} color={theme.colors.red} />
          <Label title={' Delete Account'} style={{color: theme.colors.red}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserAvatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    alignSelf: 'center',
    marginTop: '15%',
    borderWidth: 4,
    borderColor: '#FBFBFB',
  },
  logOutIcon: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    marginLeft: 10,
  },
  bottomView: {
    position: 'absolute',
    bottom: scale(20),
    marginHorizontal: scale(27),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  lbl: {
    marginBottom: scale(5),
    marginLeft: '9%',
  },
});
