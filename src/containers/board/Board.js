import hyperHTML from 'hyperhtml/esm'
import Sortable from 'sortablejs'
import { getBoardData } from '../../actions'
import List from '../../components/list'
import NewListModal from '../../components/list/NewListModal';

// styles
import './board.scss';

export default class Board extends hyperHTML.Component {
    constructor(state) {
        super();        
        let nextState = {
            board: 1,
        }
        nextState = { ...state, ...nextState }
        this.newListModal = new NewListModal(nextState);
        this.setState(nextState);
        this.getBoardData();
    }

    async getBoardData() {
        await getBoardData({id: 1});
    }
    
    onconnected(e) {
        this.element = e.srcElement;
        this.sortableList = this.element.querySelector('.lists-container');
        this.sortable = Sortable.create(this.sortableList, {
            group: {
                name: 'board',
            },
            ghostClass: "sortable-list-ghost",  // Class name for the drop placeholder
            chosenClass: "sortable-list-chosen", // change class when drag
            onEnd: (evt) => {
                // var itemEl = evt.item;  // dragged HTMLElement
                // console.log('to', evt.to);    // target list
                // console.log('from', evt.from);  // previous list
                // console.log('old i', evt.oldIndex);  // element's old index within old parent
                // console.log('new i', evt.newIndex);  // element's new index within new parent
            },
        });
    }

    render() {
        return this.html`
            <div onconnected=${this} class='ft board'>
                <div class='ft lists-container'>
                    <div class='ft d-flex flex-row ft flex-container'>
                        ${Object.values(this.state.lists).map((l) => hyperHTML.wire()`
                            <div class='ft flex-item list'>
                                ${new List(l)}
                            </div>`
                        )}
                        <div class='ft flex-item add-new-list'>
                            <button class='btn btn-default' onclick=${this.newListModal.open}>add new list</button>
                        </div>
                    </div>
                    ${this.newListModal}
                </div>
            </div>
        `
    }
}