import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import CustomIcon from '../../components/CustomIcon';
import Feather from 'react-native-vector-icons/Feather';
import {InputBox, Label, Title, NoteCard, Loader} from '../../components';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RoundIcon from '../../components/RoundIcon';
import {noteCollection} from '../../utils/FirebaseServices';
import {Menu, MenuItem} from 'react-native-material-menu';

import {isLogin} from '../../redux/Actions/UserActions';
const colorEmphasis = {
  high: 0.87,
  medium: 0.6,
  disabled: 0.38,
};

const NoteScreen = props => {
  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [load, setLoadding] = useState(false);
  const [noteDatas, setNoteData] = useState([]);
  const [noData, setNodata] = useState(false);
  const userInfo = useSelector(state => state.UserReducer.userDetails);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const noteData = useSelector(state => state.NoteReducers.noteData);
  const [datafilter, setDataFilter] = useState([]);
  const [masterdata, setMasterdata] = useState([]);
  const [search, setSearch] = useState('');

  function renderItemSeparator() {
    return <View style={styles.itemSeparator} />;
  }

  const getNote = async () => {
    setLoadding(true);
    noteCollection.doc(userInfo?._id).onSnapshot(async documentSnapshot => {
      if (documentSnapshot?.exists) {
        const notes = await documentSnapshot.data();
        setNoteData(notes.data?.reverse());
        setMasterdata(notes.data?.reverse());
        setDataFilter(notes.data?.reverse());
        setLoadding(false);
        setNodata(false);
        if (notes.data?.length === 0) {
          setNodata(true);
        }
      } else {
        setNodata(true);
        setLoadding(false);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getNote();
    }, []),
  );

  const RenderNote = ({item, index}) => {
    return (
      <View>
        <NoteCard
          index={index}
          onPress={() =>
            navigation.navigate('Notedescription', {item, noteData: noteDatas})
          }>
          <Title title={item?.title} />
          <Label title={item?.desc} style={styles.desc} numberOfLines={2} />
        </NoteCard>
      </View>
    );
  };

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const ProfileMenu = () => {
    navigation.navigate('Profile', {userInfo, noteDatas});
    setVisible(false);
  };

  const extractItemKey = item => {
    return item.id?.toString();
  };

  const deleteItem = itemId => {
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
            let filterData = [];
            filterData = noteDatas?.filter(function (n) {
              return n?._id != itemId;
            });
            const userId = userInfo?._id;
            const add = {
              data: filterData,
            };
            noteCollection
              .doc(userId)
              .set(add)
              .then(response => {
                setNoteData(filterData);
                setMasterdata(filterData);
                setDataFilter(filterData);
              })
              .catch(e => {})
              .finally(f => {});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const QuickActions = (index, item) => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          deleteItem(item._id);
        }}>
        <AntDesign name="delete" size={25} color={theme.colors.purpal} />
      </TouchableOpacity>
    );
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterdata.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataFilter(newData);
      setSearch(text);
    } else {
      setDataFilter(masterdata);
      setSearch(text);
    }
  };
  useEffect(() => {
    if (userInfo == undefined) {
      dispatch(isLogin(false));
      navigation.navigate('SignIn');
    }
  }, [userInfo]);

  const handleClear = () => {
    setSearchInput(false), setSearch('');
    setDataFilter(masterdata);
  };
  return (
    <View style={styles.main}>
      <View style={styles.headerView}>
        <View>
          <Title style={styles.title} title="Notes" />
          <Label
            title={`Welcome ${userInfo?.first_name}`}
            style={styles.nameing}
          />
        </View>

        <View style={styles.row}>
          {searchInput === true ? (
            <CustomIcon
              iconName="close"
              IconSetName={FontAwesome}
              onPress={() => {
                handleClear();
              }}
              iconSize={20}
            />
          ) : (
            <CustomIcon
              iconName="search"
              IconSetName={FontAwesome}
              onPress={() => setSearchInput(true)}
              iconSize={20}
            />
          )}

          <Menu
            visible={visible}
            anchor={
              <CustomIcon
                iconName="menu"
                IconSetName={Feather}
                onPress={() => showMenu()}
                iconSize={20}
              />
            }
            onRequestClose={hideMenu}>
            <MenuItem onPress={ProfileMenu}>
              <Label title="Profile" style={{color: theme.colors.black}} />
            </MenuItem>
            <MenuItem
              onPress={() =>
                Linking.openURL(
                  'mailto:support@brainerhub.com?subject=Feedback',
                )
              }>
              <Label
                title="Send Feedback"
                style={{color: theme.colors.black}}
              />
            </MenuItem>
          </Menu>
        </View>
      </View>
      {searchInput && (
        <Animatable.View animation="slideInDown">
          <InputBox value={search} onChangeText={text => searchFilter(text)} />
        </Animatable.View>
      )}
      {noData ? (
        <View style={styles.noData}>
          <LottieView
            source={{
              uri: 'https://assets5.lottiefiles.com/packages/lf20_hynobukt.json',
            }}
            autoPlay
            loop={false}
          />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={datafilter}
          renderItem={RenderNote}
          keyExtractor={extractItemKey}
          maxSwipeDistance={50}
        />
      )}

      <RoundIcon
        style={styles.roundIcon}
        onPress={() => navigation.navigate('CreateNote', {userInfo})}
        name={'plus'}
      />
      <Loader loading={load} />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundIcon: {
    bottom: 20,
    right: 25,
    position: 'absolute',
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    right: 20,
  },
  noData: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    color: theme.colors.purpal,
    fontSize: 24,
    fontWeight: '600',
  },
  nameing: {color: theme.colors.purpal, fontWeight: '300'},
  main: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  row: {flexDirection: 'row'},
  desc: {marginTop: 3, fontWeight: '300', color: '#333'},
  itemSeparator: {
    height: StyleSheet.hairlineWidth,

    opacity: colorEmphasis.medium,
  },
});
