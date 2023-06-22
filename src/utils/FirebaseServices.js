import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';

const usersCollection = firestore().collection('Users');
const noteCollection = firestore().collection('Notes');

const getUrserDetails = async userId => {
  return usersCollection
    .doc(userId)
    .onSnapshot(documentSnapshot => documentSnapshot.data());
};

export {usersCollection, noteCollection, getUrserDetails};
