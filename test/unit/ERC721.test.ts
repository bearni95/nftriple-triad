import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import Web3 from 'web3'
import { ERC721 } from '../../src/ERC721'

describe('ERC721', () => {
    const web3 = new Web3('wss://mainnet.infura.io/ws/v3/66de142eab66402fb428a78d2ce65fe1')
    const contractAddress: string = '0x099689220846644f87d1137665cded7bf3422747'
    const tokenId:string = '9544'
    let token:ERC721

    before(() => {
        token = new ERC721(web3, contractAddress, tokenId)
    })

    it ('should load a valid nft', async () => {
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toNumber()).to.equal(parseInt(tokenId))
    })

    it ('should retrieve the name of the token', async() => {
        const name = await token.getName()
        expect(name).to.equal('Robotos')
    })

    it ('should retrieve the symbol of the token', async() => {
        const name = await token.getSymbol()
        expect(name).to.equal('ROBO')
    })

    it ('should load using a stringified tokenId', async () => {
        const tokenHex = parseInt(tokenId).toString(16)
        token = new ERC721(web3, contractAddress, `0x${tokenHex}`)
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toNumber()).to.equal(parseInt(tokenId))
    })

    it ('should retrieve the uri, happy-path', async () => {
        const uri = await token.getTokenUri()
        expect(uri).to.equal('https://gateway.pinata.cloud/ipfs/QmQh36CsceXZoqS7v9YQLUyxXdRmWd8YWTBUz7WCXsiVty/9544')
    })

    it ('should retrieve metadata, happy-path', async() => {          
        const metadata = await token.getMetadata()
        expect(metadata.name).to.equal('Roboto #9544')
        expect(metadata.attributes.length).to.equal(11)
    })
})