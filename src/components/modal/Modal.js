import hyperHTML from 'hyperhtml/esm';
import { editListContent, deleteList } from '../../actions'

// styles
import './modal.scss';


export default class EditListModal extends hyperHTML.Component {
    constructor(state){
        super();
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        
        this.setState(state);
    }

    onconnected(e) {
        this.element = e.srcElement;
        this.overlay = this.element.querySelector('.modal-overlay');
        this.overlay.onclick = this.close;
        if (this.afterConnected) this.afterConnected();
    }

    open() {
        this.element.style.display = 'block';
    }

    close() {
        this.setState(this.initialState);
        this.element.style.display = 'none';
        if (this.afterClose) this.afterClose();
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
                <div class='modal-overlay'></div>
            </div>
        `
    }
}