import { Card } from './Card'

export class Player {
    color: 'red' | 'blue'
    private cards: Array<Card> = []
    isActiveTurn: boolean = false
    dom: HTMLElement
    constructor(color: 'red' | 'blue'){
        this.color = color

        this.dom = document.createElement('div')
        this.dom.classList.add('player')
        this.dom.classList.add(`player-${this.color}`)
        this.dom.id = `player-${this.color}`
        const body = document.querySelector('body')
        if (body){
            body.appendChild(this.dom)
        }
    }

    public loadHand(cards: Array<Card>){
        this.cards = cards
        this.cards.forEach(card => {
            this.dom.appendChild(card.dom)
            card.isOnBoard = false 
            card.isOnHand = true
        })
    }

    public getHand(): Array<Card>{
        return this.cards
    }
}