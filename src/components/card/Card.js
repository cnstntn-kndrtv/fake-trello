import hyperHTML from 'hyperhtml/esm'
import CardModal from './CardModal'

// styles
import './card.scss'

export default class Card extends hyperHTML.Component {
    constructor(state) {
        super();
        this.openModal = this.openModal.bind(this);
        this.setState(state);
    }

    onconnected(e) {
        this.element = e.srcElement;
    }

    openModal() {
        let rootEl = document.createElement('div');
        this.element.appendChild(rootEl);
        hyperHTML.bind(rootEl)`${new CardModal(this.state, rootEl)}`;
    }


    render() {
        return this.html`
            <div onconnected=${this} class='ft hover-me-to-act'>
                <div class="ft card-title">${this.state.title}</div>
                <div class='ft card-footer show-me-on-hover'>
                    <button onclick=${this.openModal} class='btn btn-link'>Show more</button>
                </div>
            </div>
        `
    }
}