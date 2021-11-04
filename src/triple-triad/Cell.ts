import { Card } from './Card'

export class Cell {
    x: number 
    y: number
    card?: Card
    color: 'unset' | 'red' | 'blue' = 'unset'
    dom: HTMLElement 
    constructor(
        parent: HTMLElement,
        x: number, 
        y: number
    ) {
        this.x = x
        this.y = y

        this.dom = document.createElement('div')
        this.dom.classList.add('cell')
        this.dom.id = `cell-${x}-${y}`
        //this.dom.innerText = `x: ${x}; y: ${y}`

        this.dom.addEventListener('click', (evt) => {
            if (window.board.isSummonPending){
                this.onClick(window.board.pendingCard!)
            }
        })
        parent.appendChild(this.dom)

    }

    onClick(card: Card){
        if (this.card) {
            throw new Error(`The cell ${this.x}-${this.y} is already occupied`)
        }

        window.board.playCard(card, this)
    }
}
