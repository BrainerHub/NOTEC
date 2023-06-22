import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import NoteReducers from './NoteReducers';
const Reducers = combineReducers({
  UserReducer,
  NoteReducers,
});

export default Reducers;
