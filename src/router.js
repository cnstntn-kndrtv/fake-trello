import navigo from 'navigo';
import store from './store';
import { isLoggedIn } from './actions'

//options for router
const root = null
const useHash = false
const hash = '#!'

export const router = new navigo(root, useHash, hash)

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const BOARD_PAGE = '/board';


export const withAuthorization = (next) => {
    isLoggedIn();
    
    let state = store.getState();
    
    if (state.user.isLoggedIn) return next();

    router.navigate(LOGIN_PAGE);
}