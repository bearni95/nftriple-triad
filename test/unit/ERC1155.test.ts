import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import Web3 from 'web3'
import { ERC1155 } from '../../src/ERC1155'

describe('ERC1155', () => {
    const web3 = new Web3('wss://mainnet.infura.io/ws/v3/66de142eab66402fb428a78d2ce65fe1')
    const contractAddress: string = '0x495f947276749ce646f68ac8c248420045cb7b5e'
    const tokenId:string = '15856337856917357433264578137314620566549072045013887703133171590393722044417'

    let token:ERC1155

    before(() => {
        token = new ERC1155(web3, contractAddress, tokenId)
    })

    it ('should load a valid nft', async () => {
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toString()).to.equal(tokenId)
    })

    it ('should fetch the metadata uri', async () => {
        const metadataUri = await token.getMetadataUri()
        expect(metadataUri).to.equal('https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/15856337856917357433264578137314620566549072045013887703133171590393722044417')
    })

    it ('should fetch the metadata', async () => {
        const metadata = await token.getMetadata()
        expect(metadata.name).to.equal('PXL STARYU [PokePxls #120] [2/10]')
        expect(metadata.image).to.equal('https://lh3.googleusercontent.com/chcVAGF3GCiHhS8IyxDdXiaBNsNAIaOLTwZOsbGs3NlF9-IHvphywBSLMLcV_g-8Sy7H8W9qWYSKWPgMeL5liczwDyimWDghMx_hykA')

    })

    /*
    it ('should retrieve the name of the token', async() => {
        const name = await token.getName()
        expect(name).to.equal('Robotos')
    })

    it ('should retrieve the symbol of the token', async() => {
        const name = await token.getSymbol()
        expect(name).to.equal('ROBO')
    })

    it ('should load using a stringified tokenId', async () => {
        token = new ERC1155(web3, contractAddress, `0x${tokenId.toString(16)}`)
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toNumber()).to.equal(tokenId)
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


    it ('should assign card stats for TT', async () => {
        const stats = await token.getCardStats()
        console.log(stats)
    })

    it ('should exercise the getCardInterface method', async () => {
        const cardInterface = await token.getCardInterface()
        console.log(cardInterface)
        //expect(cardInterface.name).to.equal('Roboto #9544')
        //expect(cardInterface.attributes.length).to.equal(11)
    })*/


})