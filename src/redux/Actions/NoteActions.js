import {noteCollection} from '../../utils/FirebaseServices';
import * as types from './ActionsTypes';
import {v4 as uuidv4} from 'uuid';

export const addNote = payload => {
  return async dispatch => {
    let isExist = await doesDocExist(payload.data[0]?.user_id);
    if (isExist) {
      let noteRes = await noteCollection.doc(payload.data[0]?.user_id).get();
      let oldNotes = await noteRes?.data().data;

      let updateArray = {data: [...oldNotes, ...payload?.data]};
      noteCollection
        .doc(payload.data[0]?.user_id)
        .update(updateArray)
        .then(response => {
          dispatch({type: types.NOTELOADING, payload: false});
        })
        .catch(e => {
          dispatch({type: types.NOTELOADING, payload: false});
        })
        .finally(f => {
          dispatch({type: types.NOTELOADING, payload: false});
        });
    } else {
      noteCollection
        .doc(payload.data[0]?.user_id)
        .set(payload)
        .then(response => {
          dispatch({type: types.NOTELOADING, payload: false});
        })
        .catch(e => {
          dispatch({type: types.NOTELOADING, payload: false});
        })
        .finally(f => {
          dispatch({type: types.NOTELOADING, payload: false});
        });
    }
    dispatch({type: types.ADDNOTE, payload: ''});
  };
};

export const getUserNote = userId => {
  return async dispatch => {
    noteCollection.doc(userId).onSnapshot(documentSnapshot => {
      const notes = documentSnapshot.data();
      dispatch({type: types.GETNOTE, payload: notes});
    });
  };
};

const doesDocExist = docID => {
  return noteCollection
    .doc(docID)
    .get()
    .then(doc => {
      return doc?.exists;
    });
};

export const noteLoadding = payload => {
  return dispatch => {
    dispatch({type: types.NOTELOADING, payload});
  };
};
