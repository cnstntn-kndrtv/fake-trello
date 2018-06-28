import hyperHTML from 'hyperhtml/esm';
import { addList } from '../../actions'
import Modal from '../modal';

export default class NewLisModal extends Modal {
    constructor(state, rootElement){
        super();
        this.rootElement = rootElement;

        this.submit= this.submit.bind(this);

        this.initialState = {
            windowTitle: `New list`,
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
        
        this.setState(this.initialState);
    }

    submit(e) {
        e.preventDefault();
        let newTitle = this.state.body.value;
        addList({ title: newTitle, board: this.state.board });
        this.close();
    }

    afterConnected() {
        this.open();
    }

    afterClose() {
        this.rootElement.remove();
    }
}
