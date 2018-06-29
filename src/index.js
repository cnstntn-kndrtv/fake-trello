import home from './views/home';
import login from './views/login';
import board from './views/board';
import { router, withAuthorization, LOGIN_PAGE, HOME_PAGE, BOARD_PAGE } from './router';

let routes ={};
routes[HOME_PAGE] = () => home();
routes[LOGIN_PAGE] = () => login(BOARD_PAGE);
routes[BOARD_PAGE] = () => { withAuthorization(board) };

// route
router
    .on(routes)
    .resolve();

router.updatePageLinks();