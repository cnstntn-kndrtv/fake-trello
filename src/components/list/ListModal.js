// import hyperHTML from 'hyperhtml/esm';
// import { , deleteTask } from '../../actions'
// import Modal from '../modal';


// export default class CardModal extends Modal {
//     constructor(state){
//         super(state);
//         state.windowTitle = 'Task';

//         // save default body content for late
//         this.defaultBody = hyperHTML.wire()`
//             <div>${state.title}</div>
//         `
//         state.body = this.defaultBody;
        
//         this.delete = this.delete.bind(this);
//         this.startEdit = this.startEdit.bind(this);
//         this.cancelEdit = this.cancelEdit.bind(this);
//         this.submitEdit= this.submitEdit.bind(this);

//         state.showFooter = true;
//         state.buttons = [
//             {title: 'delete', class: 'btn btn-danger', onclick: this.delete},
//             {title: 'edit', class: 'btn btn-primary', onclick: this.startEdit}
//         ];

//         this.setState(state);
//     }

//     startEdit() {
//         let newState = {};        
//         newState.showFooter = false;
//         newState.body = hyperHTML.wire()`
//             <form class='form-inline' onsubmit=${this.submitEdit} >
//                 <input type='text' class='form-control' value=${this.state.title}>
//                 <button class='btn btn-default' onclick=${this.cancelEdit}>Cancel</button>
//                 <button type='submit' class='btn btn-primary'>Submit</button>
//             </form>
//         `
//         this.setState({ ...this.state, ...newState })
//     }

//     cancelEdit(e) {
//         e.preventDefault();
//         let newState = {};
//         newState.showFooter = true;
//         newState.body = this.defaultBody;
//         this.setState({ ...this.state, ...newState });
//         this.render();
//     }

//     submitEdit(e) {
//         e.preventDefault();
//         let newTitle = e.target.querySelector('input').value;
//         console.log('this.state.list', this.state.list);
        
//         editTaskContent({ title: newTitle, id: this.state.id, listId: this.state.list });
//         this.render();
//     }

//     delete() {
//         deleteTask({id: this.state.id, listId: this.state.list});
//         this.close();
//     }
// }