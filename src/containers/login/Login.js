import hyperhtml from 'hyperhtml/esm';
import { login } from '../../actions';
import { router } from '../../router';

//style
import './login.scss'

export default class Home extends hyperhtml.Component {

    constructor(state, nextPage) {
        super();
        this.nextPage = nextPage;
        this.login = this.login.bind(this);
        this.setState(state);
    }

    login(event) {
        let email = event.srcElement.querySelector('#inputEmail').value;
        let password = event.srcElement.querySelector('#inputPassword').value;
        login({email: email, password: password});
        router.navigate(this.nextPage);
    }

    render() {
        return this.html`
            <div class='login-background text-center'>
                ${ this.state.request ? hyperhtml.wire()`<div class='alert alert-primary'>LOADING...</div>` : ``}
                ${ this.state.error ? hyperhtml.wire()`<div class='alert alert-danger'>TRY AGAIN</div>` : ``}

                <form class='login-form-signin' onsubmit=${this.login}>
                    
                    <h1 class='h3 mb-3 font-weight-normal'>Please sign in</h1>
                    
                    <label for='inputEmail' class='sr-only'>Email address</label>
                    <input autocomplete='email' type='email' id='inputEmail' class='form-control' placeholder='Email address' required='' autofocus='true' value='user@example.com'>
                    
                    <label for='inputPassword' class='sr-only'>Password</label>
                    <input autocomplete='current-password' type='password' id='inputPassword' class='form-control' placeholder='Password' required='' value='user'>

                    <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>

                </form>
                <div>user@example.com<div>
                </div>user</div>
            </div>
        `
    }

}