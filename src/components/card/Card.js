import hyperHTML from 'hyperhtml/esm'
import CardModal from './CardModal'

// styles
import './card.scss'

export default class Card extends hyperHTML.Component {
    constructor(state) {
        super();
        this.modal = new CardModal(state);
        this.setState(state);
    }

    onconnected(e) {
        this.element = e.srcElement;
    }

    render() {
        return this.html`
            <div onconnected=${this} class='ft hover-me-to-act'>
                <div class="ft card-title">${this.state.title}</div>
                <div class='ft card-footer show-me-on-hover'>
                    <button onclick=${this.modal.open} class='btn btn-link'>Show more</button>
                </div>
                ${this.modal}
            </div>
        `
    }
}