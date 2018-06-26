import hyperHTML from 'hyperhtml/esm'
import Card from '../card'
import Sortable from 'sortablejs';
import NewTaskModal from './NewTaskModal';
import { moveTask } from '../../actions';

// styles
import './list.scss';

export default class List extends hyperHTML.Component {
    constructor(state) {
        super();        
        this.newTaskModal = new NewTaskModal(state);
        this.setState(state);
    }

    onconnected(e) {
        this.element = e.srcElement;
        this.sortableList = this.element.querySelector('.list-body');
        this.sortable = Sortable.create(this.sortableList, {
            group: {
                name: 'list',
            },
            ghostClass: "sortable-task-ghost",  // Class name for the drop placeholder
            chosenClass: "sortable-task-chosen", // Class for chosen item
            onEnd: (e) => {
                let el = e.item;
                let params = {
                    id: el.getAttribute('data-task-id'),
                    sourceList: e.from.getAttribute('data-list-id'),
                    targetList: e.to.getAttribute('data-list-id'),
                    sourceIndex: e.oldIndex,
                    targetIndex: e.newIndex,
                }
                moveTask(params)
            },
        });
    }

    render() {
        return this.html`
            <div onconnected=${this} class='ft hover-me-to-act'>
                <div class='ft list-title'>
                    ${this.state.title}
                    <div class='show-me-on-hover'>
                        <button class='btn btn-link' onclick=${this.newTaskModal.open}>Edit</button>
                    </div>
                </div>
                <div class='ft list-body' data-list-id=${this.state.id}>
                    ${this.state.tasks.map((task) => hyperHTML.wire()`
                        <div class='ft card' data-task-id=${task.id}>${ new Card(task) }</div>
                    `)}
                </div>
                <div class='ft list-footer show-me-on-hover'>
                    <button class='btn btn-primary' onclick=${this.newTaskModal.open}>Add new task</button>
                </div>
                ${this.newTaskModal}
            </div>
        `
    }
}