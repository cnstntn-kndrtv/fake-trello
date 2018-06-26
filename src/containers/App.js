import hyperHTML from 'hyperhtml/esm'
import store from '../store'
import * as actions from '../actions'
import Board from './board'

function app() {
  // let container = new Counter(store.getState(), actions);
  let rootContainer = new Board(store.getState(), actions);

  hyperHTML(document.querySelector('#root'))`${rootContainer}`

  function _app() { 
    rootContainer.setState(store.getState());
  }

  _app()
  
  store.subscribe(_app);
}

export default app