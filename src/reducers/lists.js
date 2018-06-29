import {
        GET_BOARD_DATA_FETCH, 
        ADD_TASK,
        ADD_TASK_FETCH,
        MOVE_TASK,
        MOVE_TASK_FETCH,
        EDIT_TASK_CONTENT, 
        EDIT_TASK_CONTENT_FETCH,
        DELETE_TASK,
        DELETE_TASK_FETCH,
        ADD_LIST,
        ADD_LIST_FETCH,
        MOVE_LIST,
        MOVE_LIST_FETCH,
        EDIT_LIST_CONTENT,
        EDIT_LIST_CONTENT_FETCH,
        DELETE_LIST,
        DELETE_LIST_FETCH } from '../actions';

import { TRANSPORT_METHOD, LOCAL } from '../transport-utilities/Constants'
import uniqueId from 'lodash.uniqueid';

let initialState = {
    1: {title: 1, id: 1, board: 1, index: 3, tasks: [{title: '1-1', id: 1, list: 1}, {title: '1-2', id: 2, list: 1}]},
    2: {title: 2, id: 2, board: 1, index: 2, tasks: [{title: '2', id: 3, list: 2}]},
    3: {title: 3, id: 3, board: 1, index: 1, tasks: [{title: '2', id: 4, list: 3}]},
}
if ( TRANSPORT_METHOD != LOCAL ) {
    initialState = {};
}

function lists(state = initialState, action) {

    switch (action.type) {

        case GET_BOARD_DATA_FETCH + '_SUCCESS' : {
            let newState = {};
            for (let key in action.data) {
                let item = action.data[key];
                item.tasks.sort((a, b) => a.index - b.index);
                newState[item.id] = item;
            }
            return newState;
        }

        case ADD_TASK : {
            let data = action.payload;
            let nextState = { ...state };
            let newTask = {
                id: uniqueId('task_'),
                title: data.title,
                list: data.list,
            }
            nextState[data.list].tasks.push(newTask);
            return nextState;
        }

        case ADD_TASK_FETCH + '_SUCCESS' : {
            let data = action.data;
            let nextState = { ...state }
            let newTask = { ...data }
            nextState[newTask.list.id].tasks.push(newTask);
            return nextState;
        }

        case MOVE_TASK : {
            let data = action.payload;
            let nextState = { ...state };
            let sourceList = nextState[data.sourceList];
            let task;
            for (let i = 0; i < sourceList.tasks.length; i++) {
                if (sourceList.tasks[i].id == data.id) {
                    task = sourceList.tasks[i];
                    sourceList.tasks.splice(i, 1);
                    break;
                }
            }
            nextState[data.targetList].tasks.splice(data.targetIndex, 0, task);
            return nextState;
        }

        case MOVE_TASK_FETCH + '_REQUEST' : {
            let data = action.meta;
            let nextState = { ...state };
            let sourceList = nextState[data.sourceList];
            let task;
            for (let i = 0; i < sourceList.tasks.length; i++) {
                if (sourceList.tasks[i].id == data.id) {
                    task = sourceList.tasks[i];
                    sourceList.tasks.splice(i, 1);
                    break;
                }
            }
            nextState[data.targetList].tasks.splice(data.targetIndex, 0, task);
            return nextState;
        }

        case EDIT_TASK_CONTENT : {
            let data = action.payload;
            let nextState = { ...state };
            let list = nextState[data.list];
            for (let i = 0; i < list.tasks.length; i++) {
                if (list.tasks[i].id == data.id) {
                    list.tasks[i].title = data.title;
                    break;
                }
            }
            return nextState;
        }

        case EDIT_TASK_CONTENT_FETCH + '_SUCCESS' : {
            let data = action.data;
            let nextState = { ...state };
            let list = nextState[data.list.id];
            for (let i = 0; i < list.tasks.length; i++) {
                if (list.tasks[i].id == data.id) {
                    list.tasks[i] = data;
                    break;
                }
            }
            return nextState;
        }

        case DELETE_TASK : {
            let data = action.payload;
            let nextState = { ...state };
            let list = nextState[data.list];
            for (let i = 0; i < list.tasks.length; i++) {
                if (list.tasks[i].id == data.id) {
                    list.tasks.splice(i, 1);
                    break;
                }
            }

            return nextState;
        }

        case DELETE_TASK_FETCH + '_SUCCESS' : {
            let data = action.data;
            let nextState = { ...state };
            let list = nextState[data.list.id];
            for (let i = 0; i < list.tasks.length; i++) {
                if (list.tasks[i].id == data.id) {
                    list.tasks.splice(i, 1);
                    break;
                }
            }

            return nextState;
        }

        case ADD_LIST : {
            let data = action.payload;
            let newList = {
                id: uniqueId('list_'),
                title: data.title,
                board: data.board,
                tasks: [],
            }
            return {...state, [newList.id]: newList}
        }

        case ADD_LIST_FETCH + '_SUCCESS' : {
            let data = action.data;
            let nextState = { ...state };
            let newList = { ...data }
            nextState[newList.id] = newList.id;
            return {...state, [newList.id]: newList}
        }

        case EDIT_LIST_CONTENT : {
            let data = action.payload;
            let nextState = { ...state };
            nextState[data.id].title = data.title;
            return nextState;
        }

        case EDIT_LIST_CONTENT_FETCH + '_SUCCESS' : {
            let data = action.meta;
            let nextState = { ...state };
            nextState[data.id].title = data.title;
            return nextState;
        }

        case MOVE_LIST : {
            let data = action.payload;
            let nextState = { ...state };
            nextState[data.id].index = data.targetIndex;
            return nextState;
        }

        case MOVE_LIST_FETCH + '_SUCCESS' : {
            let data = action.meta;
            let nextState = { ...state };
            nextState[data.id].index = data.targetIndex;
            return nextState;
        }

        case DELETE_LIST : {
            let data = action.payload;
            let nextState = { ...state };
            delete(nextState[data.id]);
            return nextState;
        }

        case DELETE_LIST_FETCH + '_SUCCESS' : {
            let data = action.meta;
            let nextState = { ...state };
            delete(nextState[data.id]);
            return nextState;
        }
        

        default: {
            return state;
        }
    }
};

export default lists;