import { Card } from './Card'
import { Cell } from './Cell'
import { Player } from './Player'
import { ROBOTO_DECK, DINO_DECK } from './Decks'
declare global {
    interface Window { board: Board }
}

export class Util {
    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}



export class Board {
    cells: {[key: string]: Cell} = {}

    redPlayer: Player
    bluePlayer: Player

    dom: HTMLElement 

    isSummonPending: boolean = false

    pendingCard?: Card

    constructor(){
        this.dom = document.createElement('div')
        this.dom.classList.add('board')

        this.redPlayer = new Player('red')

        const body = document.querySelector('body')
        if (body){
            body.appendChild(this.dom)
        }

        this.bluePlayer = new Player('blue')

        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                this.cells[`${y}-${x}`] = new Cell(this.dom, y, x)
            }
        }
    }

    start(): void{
        const RED_PLAYER_CARDS:Array<Card> = []
        for (let i = 0; i < ROBOTO_DECK.length; i++){
            const card = new Card(this.redPlayer.dom, 'red', ROBOTO_DECK[i])
            RED_PLAYER_CARDS.push(card)
        }

        const BLUE_PLAYER_CARDS:Array<Card> = []
        for (let i = 0; i < DINO_DECK.length; i++){
            const card = new Card(this.bluePlayer.dom, 'blue', DINO_DECK[i])
            BLUE_PLAYER_CARDS.push(card)
        }

        this.redPlayer.loadHand(RED_PLAYER_CARDS)
        this.bluePlayer.loadHand(BLUE_PLAYER_CARDS)
        this.redPlayer.isActiveTurn = true 
    }

    getAvailableCells(): Cell[] {
        return Object.values(this.cells).filter(cell => !cell.card)
    }

    getAdjacentCells(cell: Cell) {
        const adjacentCells = []
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
                if (x === 0 && y === 0) continue
                if (x === -1 && y === -1) continue 
                if (x === 1 && y === 1) continue

                const adjacentCell = this.cells[`${cell.x + x}-${cell.y + y}`]
                if (adjacentCell) adjacentCells.push(adjacentCell)
            }
        }
        return adjacentCells
    }

    playCard(card: Card, cell: Cell): void {
        if (cell.card) {
            throw new Error('Cell is already occupied')
        }
        cell.card = card
        cell.color = card.color
        const adjacents = this.getAdjacentCells(cell)
        for (let i = 0; i < adjacents.length; i++){
            const adjacent = adjacents[i]
            const adjacentCard = adjacent.card

            if (!adjacentCard) continue 
            if (adjacentCard.color === card.color) continue

            if (cell.x === adjacent.x && cell.y > adjacent.y){
                // new card is on the bottom
                console.log('new card is on the bottom')
                if (card.cardInterface.stats.top > adjacentCard.cardInterface.stats.bottom){
                    adjacentCard.setColor((card.color === 'red') ? 'red' : 'blue')
                    console.log('won, changing color')
                }
            }

            if (cell.x === adjacent.x && cell.y < adjacent.y){
                // new card is at top
                console.log('new card is at top')
                if (card.cardInterface.stats.bottom > adjacentCard.cardInterface.stats.top){
                    adjacentCard.setColor((card.color === 'red') ? 'red' : 'blue')
                    console.log('won, changing color')
                }
            }

            if (cell.y === adjacent.y && cell.x > adjacent.x){
                // new card is on the right
                console.log('new card is on the right')
                if (card.cardInterface.stats.left > adjacentCard.cardInterface.stats.right){
                    adjacentCard.setColor((card.color === 'red') ? 'red' : 'blue')
                    console.log('won, changing color')
                }
            }

            if (cell.y === adjacent.y && cell.x < adjacent.x){
                // new card is on the left
                console.log('new card is on the left')
                if (card.cardInterface.stats.right > adjacentCard.cardInterface.stats.left){
                    adjacentCard.setColor((card.color === 'red') ? 'red' : 'blue')
                    console.log('won, changing color')
                }
            }
        }
        card.dom.classList.remove('selected')
        cell.dom.appendChild(card.dom)

        card.isOnBoard = true 
        card.isOnHand = false

        this.isSummonPending = false 
        this.pendingCard = undefined

        this.redPlayer.isActiveTurn = !(this.redPlayer.isActiveTurn)
        this.bluePlayer.isActiveTurn = !(this.bluePlayer.isActiveTurn)

        const availableCells = Object.values(this.cells).filter(cell => !cell.card)

        if (availableCells.length === 0){
            // game over!
            this.gameOver()
        }
    }        


    gameOver(): void {
        const redCells = Object.values(this.cells).filter(cell => cell.color === 'red')
        const blueCells = Object.values(this.cells).filter(cell => cell.color === 'blue')

        if (redCells.length > blueCells.length){
            alert('Red player wins!')
        } else {
            alert('Blue player wins!')
        }

        window.location.reload()
    }
}