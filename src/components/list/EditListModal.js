import hyperHTML from 'hyperhtml/esm';
import { editListContent, deleteList } from '../../actions';
import Modal from '../modal';

export default class EditListModal extends Modal {
    constructor(state, rootElement){
        super();
        this.rootElement = rootElement;

        this.delete = this.delete.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.submitEdit= this.submitEdit.bind(this);

        this.initialState = {
            windowTitle: 'Task',
            showFooter: true,
            buttons: [
                {title: 'Delete', class: 'btn btn-danger', onclick: this.delete},
                {title: 'Edit', class: 'btn btn-primary', onclick: this.startEdit},
                {title: 'Cancel', class: 'btn btn-default', onclick: this.close},
            ],
            defaultButtonClass: 'btn btn-default',
        }

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
        editListContent({ title: newTitle, id: this.state.id, board: this.state.board });
        this.render();
    }

    delete() {
        deleteList({ id: this.state.id });
        this.close();
    }

    afterConnected() {
        this.open();
    }

    afterClose() {
        this.rootElement.remove();
    }

}