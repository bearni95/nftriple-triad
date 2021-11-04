import { NFT } from "../NFT"
import { CardInterface } from "../interfaces/CardInterface"

export class Card {
    cardInterface: CardInterface

    isOnHand: boolean = false 
    isOnBoard: boolean = false
    isSelected: boolean = false 

    color: 'red' | 'blue'

    dom: HTMLElement

    constructor(
        parent: HTMLElement,
        color: 'red' | 'blue',
        cardInterface: CardInterface
    ){
        this.color = color
        this.cardInterface = cardInterface

        this.dom = document.createElement('div')
        this.dom.classList.add('card')
        this.dom.classList.add(`card-${this.color}`)
        this.dom.style.backgroundImage = `url('${this.cardInterface.image}')`
        this.dom.id = `card-${Date.now()}`

        this.dom.innerHTML = `<center>${this.cardInterface.stats.top}</center>` +
        '<div class="middle">' +
        `<div class="stat-left">${this.cardInterface.stats.left}</div>` + 
        `<div class="stat-right">${this.cardInterface.stats.right}</div>` +
        '</div>' + 
        `<center>${this.cardInterface.stats.bottom}</center>`

        this.dom.addEventListener('click', () => {
            if (window.board.bluePlayer.isActiveTurn && this.color === 'blue') {
                this.onClick()
            }

            if (window.board.redPlayer.isActiveTurn && this.color === 'red') {
                this.onClick()
            }
        })

        parent.appendChild(this.dom)
    }

    setColor(color: 'red' | 'blue'){
        this.dom.classList.remove(`card-blue`)
        this.dom.classList.remove(`card-red`)
        this.color = color
        this.dom.classList.add(`card-${color}`)
    }

    onClick() {
        console.log('selected card', window.board.bluePlayer.isActiveTurn, this.color)
        // card is selected to be played 
        this.isSelected = true
        const selected = document.querySelectorAll('.selected')
        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected')
        }
        this.dom.classList.add('selected')

        window.board.isSummonPending = true
        window.board.pendingCard = this
    }
}