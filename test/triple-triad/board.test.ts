import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import { Card, Board, Cell } from '../../src/triple-triad/index'

describe('Triple Triad: Board', () => {
    const board = new Board()

    it ('should ensure the board has been created properly', () => {          
        expect(board.redPlayer.color).to.equal('red')
        expect(board.redPlayer.getHand().length).to.equal(0)
        expect(board.bluePlayer.color).to.equal('blue')
        expect(board.bluePlayer.getHand().length).to.equal(0)
        
        const cellArray = Object.keys(board.cells).map(key => board.cells[key])
        for (let i = 0; i < cellArray.length; i++) {
            expect(cellArray[i].color).to.equal('unset')
        }
    })

    it ('should exercise the start method', async () => {
        board.start()
        expect(board.redPlayer.getHand().length).to.equal(5)
        expect(board.bluePlayer.getHand().length).to.equal(5)
        expect(board.redPlayer.isActiveTurn).to.be.true
    })

    it ('should exercise the `getAvailableCells` method', () => {
        const availableCells = board.getAvailableCells()
        expect(availableCells.length).to.equal(9)
    })


    it ('should exercise `getAdjacentCells` from the top-left cell', () => {
        const cell = board.cells['0-0']
        const adjacentCells = board.getAdjacentCells(cell)
        expect(adjacentCells.length).to.equal(2)
        expect(adjacentCells[0].x).to.equal(0)
        expect(adjacentCells[0].y).to.equal(1)
        expect(adjacentCells[1].x).to.equal(1)
        expect(adjacentCells[1].y).to.equal(0)
    })

    it ('should exercise `playCard` method', () => {
        board.playCard(board.redPlayer.getHand()[0], board.cells['0-0'])
        expect(board.cells['0-0'].card).to.equal(board.redPlayer.getHand()[0])
        expect(board.cells['0-0'].color).to.equal('red')
    })

    it ('should fail when trying to call `playCard` on an occupied cell', () => {
        try {
            const cell = board.cells['0-0']
            board.playCard(board.redPlayer.getHand()[0], cell)
        } catch (e) {
            expect(e.message).to.equal('Cell is already occupied')
        }
    })

    it ('should play a card at the bottom and win over the existing 0-0', () => {

        board.bluePlayer.getHand()[0].stats.top = 1E10
        board.playCard(board.bluePlayer.getHand()[0], board.cells['0-1'])
    })

})