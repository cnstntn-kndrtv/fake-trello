import * as Redux from 'redux';
import lists from './lists';
import user from './user';

const reducers = Redux.combineReducers({
    lists: lists,
    user: user,
})

export default reducers;
