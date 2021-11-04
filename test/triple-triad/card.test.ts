import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import { Card } from '../../src/triple-triad/index'

describe('Triple Triad: Card', () => {
    const card = new Card(null, 'red', {
        top: 3,
        left: 5,
        right: 5,
        bottom: 3,
    })

    it ('should initialize a card given the stats', async () => {
        expect(card.isOnBoard).to.be.false 
        expect(card.stats.top).to.equal(3)
        expect(card.stats.left).to.equal(5)
        expect(card.stats.right).to.equal(5)
        expect(card.stats.bottom).to.equal(3)
        expect(card.isOnHand).to.be.false
        expect(card.isSelected).to.be.false
    })

    it ('should exercise the onClick methid', async () => {
        card.onClick()
    })
})