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
        this.fake = this.fake.bind(this);

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
            },
            onUpdate: (e) => {
                let el = e.item;
                el.remove();
            }
        });
    }

    fake() {
        let i = Math.round(Math.random() * 3);
        let id = 1;
        let params = {
            id: id,
            sourceIndex: this.state.lists[id].index,
            targetIndex: i,
        }
        console.log(params.sourceIndex, params.targetIndex);
        
        moveList(params)
    }

    openNewListModal() {
        let rootEl = document.createElement('div');
        this.element.appendChild(rootEl);
        hyperHTML.bind(rootEl)`${new NewListModal(this.state, rootEl)}`
    }

    render() {
        console.log('render');
        
        let lists = Object.values(this.state.lists);
        lists.sort((a, b) => a.index - b.index);
        
        let listNodes = lists.map((l) => hyperHTML.wire(l)`
            <div class='ft flex-item list' data-list-id=${l.id}>
                ${new List(l)}
            </div>`
        );

        return this.html`
        <button class='btn btn-danger' onclick=${this.fake}>MOVE</button>
            <div onconnected=${this} class='ft board'>
                <div class='ft lists-container'>
                    <div class='d-flex flex-row'>
                        <div class='d-flex flex-row ft flex-container draggable-list'>
                            ${lists.map((l) => hyperHTML.wire(l)`
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