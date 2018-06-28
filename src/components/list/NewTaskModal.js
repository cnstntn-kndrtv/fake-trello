import hyperHTML from 'hyperhtml/esm';
import { addTask } from '../../actions'
import Modal from '../modal';

export default class NewTaskModal extends Modal {
    constructor(state, rootElement){
        super();
        this.rootElement = rootElement;
        
        this.submit= this.submit.bind(this);

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
        
        this.setState(this.initialState);
    }

    submit(e) {
        e.preventDefault();
        let newTitle = this.state.body.value;
        addTask({ title: newTitle, list: this.state.id });
        this.close();
    }

    afterConnected() {
        this.open();
    }

    afterClose() {
        this.rootElement.remove();
    }
}
