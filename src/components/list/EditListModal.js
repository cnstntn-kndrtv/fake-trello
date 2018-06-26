import hyperHTML from 'hyperhtml/esm';
import { editListContent, deleteList } from '../../actions'

// styles
import './cardModal.scss';


export default class CardModal extends hyperHTML.Component {
    constructor(state){
        super();

        this.delete = this.delete.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.submitEdit= this.submitEdit.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.initialState = {
            windowTitle: 'Task',
            showFooter: true,
            buttons: [
                {title: 'Delete', class: 'btn btn-danger', onclick: this.delete},
                {title: 'Edit', class: 'btn btn-primary', onclick: this.startEdit},
                {title: 'Cancel', class: 'btn btn-default', onclick: this.close}
            ],
            defaultButtonClass: 'btn btn-default',
        }
        state.windowTitle = 'Task';

        // save default body content for late
        this.initialState.body = hyperHTML.wire()`
            <div>${state.title}</div>
        `
        this.initialState = {...state, ...this.initialState};
        this.setState(this.initialState);
    }

    startEdit() {
        let newState = {};        
        newState.showFooter = false;
        newState.body = hyperHTML.wire()`
            <form class='form-inline' onsubmit=${this.submitEdit} >
                <input type='text' class='form-control' value=${this.state.title}>
                <button class='btn btn-default' onclick=${this.cancelEdit}>Cancel</button>
                <button type='submit' class='btn btn-primary'>Submit</button>
            </form>
        `
        this.setState({ ...this.state, ...newState })
    }

    cancelEdit(e) {
        e.preventDefault();
        let newState = {};
        newState.showFooter = true;
        newState.body = this.initialState.body;
        this.setState({ ...this.state, ...newState });
        this.render();
    }

    submitEdit(e) {
        e.preventDefault();
        let newTitle = e.target.querySelector('input').value;
        editTaskContent({ title: newTitle, id: this.state.id, list: this.state.list });
        this.render();
    }

    delete() {
        deleteTask({id: this.state.id, list: this.state.list});
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