import {Alert, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, theme} from '../../utils';
import {Label, Header, Title, AlertModel} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {noteCollection} from '../../utils/FirebaseServices';

const NoteDescription = ({route}) => {
  const [show, setShow] = useState(false);
  const {item, noteData} = route.params;
  const [allNotes, setAllnotes] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.UserReducer.userDetails);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    setAllnotes(noteData);
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      '',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setLoading(true);
            let filterData = [];
            filterData = allNotes?.filter(function (n) {
              return n?._id != item?._id;
            });
            const userId = userInfo?._id;
            const add = {
              data: filterData,
            };
            noteCollection
              .doc(userId)
              .set(add)
              .then(response => {
                setLoading(false);
                navigation.goBack();
                ToastAndroid.show('Deleted sucessfully', ToastAndroid.SHORT);
              })
              .catch(e => {
                setLoading(false);
              })
              .finally(f => {
                setLoading(false);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <Header
        onPress={() => navigation.goBack()}
        HeaderTitle={'Note Description'}
        iconStyle={styles.iconStyle}
        iconName="edit"
        deleteIcon
        onPressDelete={handleDelete}
        onPressSave={() => {
          navigation.replace('CreateNote', {item, edit: noteData});
        }}
      />
      <View style={{padding: 20}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Title
            title={item.title}
            style={{
              fontSize: scale(20),
              marginTop: 10,
              width: theme.SCREENWIDTH * 0.7,
            }}
          />
          <View>
            <Label
              title="Created at"
              style={{
                opacity: 0.5,
                fontSize: scale(12),
                color: theme.colors.black,
              }}
            />
            <Label
              title={item?.date}
              style={{
                opacity: 0.5,
                fontSize: scale(10),
                left: scale(2),
                color: theme.colors.black,
              }}
            />
          </View>
        </View>
        <Label
          title={item.desc}
          style={{
            marginTop: scale(15),
            fontWeight: '300',
            fontSize: scale(13),
            color: theme.colors.black,
          }}
        />
        {show && <AlertModel title="your note is deleted successfully" />}
      </View>
    </View>
  );
};

export default NoteDescription;

const styles = StyleSheet.create({});
