import hyperHTML from 'hyperhtml/esm';
import store from '../store';
import Login from '../containers/login';
import { isLoggedIn } from '../actions';
import { router, BOARD_PAGE } from '../router';

function app(nextPage) {
  isLoggedIn();

  nextPage = nextPage || BOARD_PAGE;

  let state = store.getState();
  console.log(state.user);
  
  if (state.user.isLoggedIn) {
    router.navigate(nextPage);
    return;
  }
  
  let rootContainer = new Login(state.user, nextPage);

  hyperHTML(document.querySelector('#root'))`${rootContainer}`;

  function _app() {
    let state = store.getState();
    if (state.user.isLoggedIn) {
      router.navigate(nextPage);
      return;
    }
    rootContainer.setState(state.user, nextPage);
  }

  _app()
  
  store.subscribe(_app);
}

export default app