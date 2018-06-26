import app from './containers/App';
import navigo from 'navigo';

//set options for router
const root = null
const useHash = false
const hash = '#!'
const router = new navigo(root, useHash, hash)

//routing will be done in this file.
router
    .on({
        '/': () => { app() }
    })
    .resolve();