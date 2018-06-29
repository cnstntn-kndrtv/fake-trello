import hyperhtml from 'hyperhtml/esm';
import {router, LOGIN_PAGE} from '../../router';

// styles
import './home.scss';

export default class Home extends hyperhtml.Component {

    constructor(state) {
        super();
        this.goToLoginPage = this.goToLoginPage.bind(this);
        this.setState(state);
    }

    goToLoginPage() {
        router.navigate(LOGIN_PAGE);
    }

    render() {
        return this.html`
            <div class="home-background">
                <main class="home-banner text-center">
                    <h1 >Welcome...</h1>
                    <p class="lead">Please login.</p>
                    <button onclick=${this.goToLoginPage} class="btn btn-danger">Enter</button>
                </main>

            </div>
        `
    }

}