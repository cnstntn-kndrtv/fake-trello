import hyperHTML from 'hyperhtml/esm';
import { addTask } from '../../actions'

// styles
import './modal.scss';


export default class NewTaskModal extends hyperHTML.Component {
    constructor(state){
        super();

        this.submit= this.submit.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.initialState = {
            windowTitle: `New task for '${state.title}'`,
            showFooter: true,
            buttons: [
                {title: 'Submit', class: 'btn btn-primary', onclick: this.submit},
                {title: 'Cancel', class: 'btn btn-default', onclick: this.close},
            ],
            defaultButtonClass: 'btn btn-default',
        }

        // save default body content for late
        this.initialState.body = hyperHTML.wire()`
            <input type='text' class='form-control' value=''>
        `
        this.initialState = {...state, ...this.initialState};
        this.nextState = {...state, ...this.initialState};
        
        this.setState(this.nextState);
    }

    submit(e) {
        e.preventDefault();
        let newTitle = this.state.body.value;
        addTask({ title: newTitle, list: this.state.id });
        this.close();
    }

    onconnected(e) {
        this.element = e.srcElement;
    }

    open() {
        this.element.style.display = 'block';
    }

    close() {
        this.setState(this.initialState);
        this.element.style.display = 'none';
    }

    render() {
        return this.html`
            <div onconnected=${this} class='modal'>
                <div class='modal-dialog'>
                    <div class="modal-content">
                        <div class='modal-header'>
                            <div class='modal-title'>${this.state.windowTitle || ''}</div>
                            <button class="close btn bnt-link" onclick=${this.close} >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class='modal-body'>${this.state.body}</div>
                        ${
                            this.state.showFooter
                            ? hyperHTML.wire()`
                                <div class='modal-footer'>
                                    ${this.state.buttons
                                        ? this.state.buttons.map((b) => hyperHTML.wire()`<button class=${b.class? b.class : this.defaultButtonClass} onclick=${b.onclick}>${b.title}</button>`)
                                        : ''
                                    }
                                </div>   
                            `
                            : ''
                        }
                    </div>
                </div>
            </div>
        `
    }
}
