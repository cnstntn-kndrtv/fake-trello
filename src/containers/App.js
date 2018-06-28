import hyperHTML from 'hyperhtml/esm'
import store from '../store'
import * as actions from '../actions'
import Board from './board'

function app() {
  let state = store.getState();
  let lists = Object.values(state.lists);
  
  let rootContainer = new Board({lists: lists}, actions);

  hyperHTML(document.querySelector('#root'))`${rootContainer}`

  function _app() { 
    let state = store.getState();
    let lists = Object.values(state.lists)
    console.log(lists);
    
    rootContainer.setState({lists: lists});
  }

  _app()
  
  store.subscribe(_app);
}

export default app