import hyperHTML from 'hyperhtml/esm'
import store from '../store'
import Board from '../containers/board'


function app() {
    let state = store.getState();
    let lists = Object.values(state.lists);

    let rootContainer = new Board({ lists: lists });

    hyperHTML(document.querySelector('#root'))
    `${rootContainer}`

    function _app() {
        let state = store.getState();
        let lists = Object.values(state.lists)

        rootContainer.setState({ lists: lists });
    }

    _app()

    store.subscribe(_app);
}

export default app