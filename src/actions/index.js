import store from '../store';
import { TRANSPORT_METHOD, FETCH, API_PREFIX } from '../transport-utilities/Constants';

export const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const isLoggedIn = () => {
    store.dispatch({
        type: IS_LOGGED_IN,
        payload: {},
    })
}

// login
export const LOGIN = 'LOGIN';

export const login = (params) => {
    if (!params.email || !params.password) return;

    if (TRANSPORT_METHOD === FETCH) {
        return loginFetch(params);
    }

    const fakeUser = {
        email: 'user@example.com',
        password: 'user',
    }
    
    if (params.email != fakeUser.email) return;
    if (params.password != fakeUser.password) return;
    
    store.dispatch({
        type: LOGIN,
        payload: {
            email: params.email,
            password: params.password,
        }
    })
}

export const LOGIN_FETCH = 'LOGIN_FETCH';

function loginFetch(params) {
    store.dispatch({
        type: LOGIN_FETCH,
        meta: {
            email: params.email,
            password: params.password,
        },
        $payload: {
            url: `${API_PREFIX}/login/?email=${params.email}&password=${params.password}`,
            responseType: 'json',
            options: {
                method: 'GET'
            }
        }
    })
}



// task constants
export const ADD_TASK = 'ADD_TASK';

export const addTask = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return addTaskFetch(params);
    }
    store.dispatch({
        type: ADD_TASK,
        payload: {
            list: params.list,
            title: params.title,
        }
    })
}

export const ADD_TASK_FETCH = 'ADD_TASK_FETCH';

function addTaskFetch(params) {
    store.dispatch({
        type: ADD_TASK_FETCH,
        meta: {
            list: params.list,
            title: params.title,
        },
        $payload: {
            url: `${API_PREFIX}/task/create/?title=${params.title}&list=${params.list}`,
            responseType: 'json',
            options: {
                method: 'GET'
            }
        }
    })
}

export const MOVE_TASK = 'MOVE_TASK';

export const moveTask = (params) => {
    let isChanged = false;
    if ( params.sourceList != params.targetList ) {
        isChanged = true;
    }
    if ( params.sourceIndex != params.targetIndex ) {
        isChanged = true;
    }
    if (!isChanged) return;

    if (TRANSPORT_METHOD === FETCH) {
        return moveTaskFetch(params);
    }
    
    store.dispatch({
        type: MOVE_TASK,
        payload: {
            id: params.id,
            sourceList: params.sourceList,
            targetList: params.targetList,
            targetIndex: params.targetIndex,
        }
    })
}

export const MOVE_TASK_FETCH = 'MOVE_TASK_FETCH'

function moveTaskFetch(params) {
    store.dispatch({
        type: MOVE_TASK_FETCH,
        meta: {
            id: params.id,
            sourceList: params.sourceList,
            targetList: params.targetList,
            targetIndex: params.targetIndex,
        },
        $payload: {
            url: `${API_PREFIX}/task/${params.id}?list=${params.targetList}&index=${params.targetIndex}`,
            responseType: 'json',
            options: {
                method: 'PATCH'
            }
        }
    })
}

// edit task
export const EDIT_TASK_CONTENT = 'EDIT_TASK_CONTENT';

export const editTaskContent = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return editTaskContentFetch(params);
    }

    store.dispatch({
        type: EDIT_TASK_CONTENT,
        payload: {
            id: params.id,
            title: params.title,
            list: params.list,
        },
    })
}

export const EDIT_TASK_CONTENT_FETCH = 'EDIT_TASK_CONTENT_FETCH';

function editTaskContentFetch (params) {
    store.dispatch({
        type: EDIT_TASK_CONTENT_FETCH,
        meta: {
            id: params.id,
            title: params.title,
            list: params.list,
        },
        $payload: {
            url: `${API_PREFIX}/task/${params.id}?title=${params.title}`,
            responseType: 'json',
            options: {
                method: 'PATCH'
            }
        }
    })
}


// delete task
export const DELETE_TASK = 'DELETE_TASK';

export const deleteTask = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return deleteTaskFetch(params);
    }

    store.dispatch({
        type: DELETE_TASK,
        payload: {
            id: params.id,
            list: params.list,
        },
    })
}

export const DELETE_TASK_FETCH = 'DELETE_TASK_FETCH';

function deleteTaskFetch (params) {
    store.dispatch({
        type: DELETE_TASK_FETCH,
        meta: {
            id: params.id,
            list: params.list,
        },
        $payload: {
            url: `${API_PREFIX}/task/${params.id}`,
            responseType: 'json',
            options: {
                method: 'DELETE'
            }
        }
    })
}



// add list
export const ADD_LIST = 'ADD_LIST';

export const addList = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return addListFetch(params);
    }
    store.dispatch({
        type: ADD_LIST,
        payload: {
            board: params.board,
            title: params.title,
        }
    })
}

export const ADD_LIST_FETCH = 'ADD_LIST_FETCH';

function addListFetch(params) {
    store.dispatch({
        type: ADD_LIST_FETCH,
        meta: {
            board: params.board,
            title: params.title,
        },
        $payload: {
            url: `${API_PREFIX}/list/create/?title=${params.title}&board=${params.board}`,
            responseType: 'json',
            options: {
                method: 'GET'
            }
        }
    })
}

// delete list
export const DELETE_LIST = 'DELETE_LIST';

export const deleteList = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return deleteListFetch(params);
    }

    store.dispatch({
        type: DELETE_LIST,
        payload: {
            id: params.id,
        },
    })
}

export const DELETE_LIST_FETCH = 'DELETE_LIST_FETCH';

function deleteListFetch(params) {
    store.dispatch({
        type: DELETE_LIST_FETCH,
        meta: {
            id: params.id,
        },
        $payload: {
            url: `${API_PREFIX}/list/${params.id}`,
            responseType: 'json',
            options: {
                method: 'DELETE'
            }
        }
    })
}


export const EDIT_LIST_CONTENT = 'EDIT_LIST_CONTENT';

export const editListContent = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return editListContentFetch(params);
    }

    store.dispatch({
        type: EDIT_LIST_CONTENT,
        payload: {
            id: params.id,
            title: params.title,
        },
    })
}

export const EDIT_LIST_CONTENT_FETCH = 'EDIT_LIST_CONTENT_FETCH';

function editListContentFetch(params) {
    store.dispatch({
        type: EDIT_LIST_CONTENT_FETCH,
        meta: {
            id: params.id,
            title: params.title,
        },
        $payload: {
            url: `${API_PREFIX}/list/${params.id}?title=${params.title}`,
            responseType: 'json',
            options: {
                method: 'PATCH'
            }
        }
    })
}

export const MOVE_LIST = 'MOVE_LIST';

export const moveList = (params) => {
    let isChanged = false;
    if ( params.sourceIndex != params.targetIndex ) {
        isChanged = true;
    }
    if (!isChanged) return;

    if (TRANSPORT_METHOD === FETCH) {
        return moveListFetch(params);
    }
    
    store.dispatch({
        type: MOVE_LIST,
        payload: {
            id: params.id,
            targetIndex: params.targetIndex,
        }
    })
}

export const MOVE_LIST_FETCH = 'MOVE_LIST_FETCH'

function moveListFetch(params) {
    store.dispatch({
        type: MOVE_LIST_FETCH,
        meta: {
            id: params.id,
            targetIndex: params.targetIndex,
        },
        $payload: {
            url: `${API_PREFIX}/list/${params.id}?index=${params.targetIndex}`,
            responseType: 'json',
            options: {
                method: 'PATCH'
            }
        }
    })
}

// get board data
export const GET_BOARD_DATA = 'GET_BOARD_DATA';

export const getBoardData = (params) => {
    if (TRANSPORT_METHOD === FETCH) {
        return getBoardDataFetch(params);
    }

    store.dispatch({
        type: GET_BOARD_DATA,
        payload: {}
    })
}

export const GET_BOARD_DATA_FETCH = 'GET_BOARD_DATA_FETCH';

function getBoardDataFetch(params) {
    store.dispatch({
        type: GET_BOARD_DATA_FETCH,
        meta: {
            id: params.id
        },
        $payload: {
            url: `${API_PREFIX}/list/?board=${params.id}`,
            responseType: 'json',
            options: {
                method: 'GET'
            }
        }
    })
}