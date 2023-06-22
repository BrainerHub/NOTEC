import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, ToastAndroid, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AlertModel, Header, Loader} from '../../components';
import {scale, theme} from '../../utils';
import {addNote, noteLoadding} from '../../redux/Actions/NoteActions';
import {noteCollection} from '../../utils/FirebaseServices';

const CustomTextInput = props => {
  const {placeholder, numberOfLines, style, onChangeText, value} = props;
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.purpal}
      multiline={true}
      onChangeText={onChangeText}
      value={value}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
    />
  );
};
const CreateNote = ({route}) => {
  const navigation = useNavigation();
  const {edit, item} = route.params;
  const userInfo = useSelector(state => state.UserReducer.userDetails);
  const [title, setTitle] = useState(null);
  const [descrption, setDescrption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const isLoad = useSelector(state => {
    state.NoteReducers.isLoadding;
  });
  useEffect(() => {
    setTitle(item?.title);
    setDescrption(item?.desc);
  }, [edit]);

  const handleNote = async () => {
    if (
      title != null &&
      descrption != null &&
      title[0] != ' ' &&
      descrption[0] != ' '
    ) {
      if (edit) {
        if (title != '' && descrption != '') {
          setLoading(true);
          let updateItem = {...item};
          let updatenote = [...edit];
          let index = updatenote.findIndex(el => el._id == item._id);
          updatenote[index].title = title;
          updatenote[index].desc = descrption;
          const updateData = {
            data: updatenote,
          };
          const userId = userInfo?._id;
          noteCollection
            .doc(userId)
            .set(updateData)
            .then(response => {
              setLoading(false);
              navigation.goBack();
            })
            .catch(e => {
              setLoading(false);
            })
            .finally(f => {
              setLoading(false);
            });
        } else {
          ToastAndroid.show('Empty not allowed', ToastAndroid.SHORT);
        }
      } else {
        dispatch(noteLoadding(true));
        setLoading(true);
        const add = {
          data: [
            {
              title: title.trim(),
              desc: descrption,
              date: new Date().toDateString(),
              color: '',
              _id: Math.floor(Math.random() * 1145415614635351),
              user_id: userInfo?._id,
              create_by: `${userInfo?.first_name} ${userInfo?.last_name}`,
            },
          ],
        };
        await dispatch(addNote(add));
        setLoading(false);
        navigation.navigate('Home');
        ToastAndroid.show('Task created successfully', ToastAndroid.SHORT);
      }
    } else {
      setShow(true);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <Header
        HeaderTitle={edit ? 'Edit Your Note' : 'Create Your Note'}
        onPress={() => navigation.goBack()}
        iconName={'save'}
        onPressSave={handleNote}
      />

      <View style={styles.container}>
        <CustomTextInput
          placeholder="Note Title"
          numberOfLines={1}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <CustomTextInput
          placeholder="Note Description..."
          value={descrption}
          style={styles.input1}
          onChangeText={text => {
            setDescrption(text);
          }}
          numberOfLines={5}
        />
        <AlertModel
          isVisible={show}
          title="Blank Note"
          subTitle="Must add title and note description"
          close={() => setShow(false)}
        />
      </View>
      {loading && <Loader loading={true} />}
    </View>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.SCREENHEIGHT * 0.05,
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: scale(1),
    borderBottomEndRadius: scale(2),
    borderBottomColor: theme.colors.purpal,
    fontSize: scale(25),
    padding: scale(5),
    color: theme.colors.black,
  },
  input1: {
    borderBottomColor: theme.colors.white,
    fontSize: scale(14),
    padding: scale(5),
    height: theme.SCREENHEIGHT * 0.3,
    marginTop: theme.SCREENHEIGHT * 0.02,
    color: theme.colors.black,
    flex: 1,
  },
  TextInput: {
    marginTop: 30,
  },
  RoundIcon: {backgroundColor: theme.colors.lightpurpal, margin: 10},
});
