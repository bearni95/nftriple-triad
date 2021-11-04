import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import Web3 from 'web3'
import { ERC721Card } from '../../src/triple-triad/ERC721Card'

describe('ERC721Card', () => {
    const web3 = new Web3('wss://mainnet.infura.io/ws/v3/66de142eab66402fb428a78d2ce65fe1')
    const contractAddress: string = '0x099689220846644f87d1137665cded7bf3422747'
    const tokenId:string = '9544'
    let token:ERC721Card

    before(() => {
        token = new ERC721Card(web3, contractAddress, tokenId)
    })

    it ('should assign card stats for TT', async () => {
        const stats = await token.getCardStats()
        expect(stats.top).to.equal(1)
        expect(stats.left).to.equal(4)
        expect(stats.right).to.equal(1)
        expect(stats.bottom).to.equal(4)
    })

    it ('should exercise the getCardInterface method', async () => {
        const cardInterface = await token.getCardInterface()

        expect(cardInterface.contractAddress).to.equal('0x099689220846644f87d1137665cded7bf3422747')
        expect(cardInterface.tokenId).to.equal('9544')
        expect(cardInterface.name).to.equal('Roboto #9544')
        expect(cardInterface.description).to.equal('Robotos is a collection of algorithmically generated droid characters designed by Pablo Stanley')
        expect(cardInterface.image).to.equal('https://gateway.pinata.cloud/ipfs/QmepfdXyxv22Q74sypG1qgMi1bepn8yhD8seaXX9PERYxt')
    })


})