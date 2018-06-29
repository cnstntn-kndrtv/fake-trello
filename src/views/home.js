import hyperHTML from 'hyperhtml/esm'
import store from '../store'
import Home from '../containers/home'

function app() {
    let rootContainer = new Home(store.getState());

    hyperHTML(document.querySelector('#root'))
    `${rootContainer}`

    function _app() {
        rootContainer.setState(store.getState());
    }

    _app()

    store.subscribe(_app);
}

export default app