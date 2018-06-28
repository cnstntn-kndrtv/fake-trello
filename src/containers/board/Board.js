import hyperHTML from 'hyperhtml/esm'
import Sortable from 'sortablejs'
import { getBoardData } from '../../actions'
import List from '../../components/list'
import NewListModal from '../../components/list/NewListModal';
import { moveList } from '../../actions';

// styles
import './board.scss';

export default class Board extends hyperHTML.Component {
    constructor(state) {
        super();        
        let nextState = {
            board: 1,
        }
        nextState = { ...state, ...nextState }

        this.openNewListModal = this.openNewListModal.bind(this);

        this.setState(nextState);
        this.getBoardData();
    }

    async getBoardData() {
        await getBoardData({id: 1});
    }
    
    onconnected(e) {
        this.element = e.srcElement;
        this.sortableList = this.element.querySelector('.draggable-list');
        this.sortable = Sortable.create(this.sortableList, {
            group: {
                name: 'board',
            },
            scroll: true,
            ghostClass: "sortable-list-ghost",  // Class name for the drop placeholder
            chosenClass: "sortable-list-chosen", // change class when drag
            onEnd: (e) => {
                let el = e.item;
                let params = {
                    id: el.getAttribute('data-list-id'),
                    sourceIndex: e.oldIndex,
                    targetIndex: e.newIndex,
                }
                moveList(params);
            }
        });
    }

    openNewListModal() {
        let rootEl = document.createElement('div');
        this.element.appendChild(rootEl);
        hyperHTML.bind(rootEl)`${new NewListModal(this.state, rootEl)}`
    }

    render() {
        console.log('Board', this.state);
        
        // let lists = Object.values(this.state.lists);
        this.state.lists.sort((a, b) => a.index - b.index);

        return this.html`
            <div onconnected=${this} class='ft board'>
                <div class='ft lists-container'>
                    <div class='d-flex flex-row'>
                        <div class='d-flex flex-row ft flex-container draggable-list'>
                            ${this.state.lists.map((l) => hyperHTML.wire(l)`
                                <div class='ft flex-item list' data-list-id=${l.id}>
                                    ${new List(l)}
                                </div>`
                            )}
                        </div>
                        <div class='ft flex-item add-new-list'>
                            <button class='btn btn-default' onclick=${this.openNewListModal}>add new list</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}