import * as Redux from 'redux';
import lists from './lists';

const reducers = Redux.combineReducers({
    lists: lists,
})

export default reducers;
