import Web3 from 'web3'
import { ERC721 } from '../ERC721'
import { CardInterface } from '../interfaces/CardInterface'
import { ERC721Card } from './ERC721Card'

export class CardImporter {
    web3: Web3
    constructor(urls: Array<string>){
        this.web3 = new Web3('wss://mainnet.infura.io/ws/v3/66de142eab66402fb428a78d2ce65fe1')

        //this.bulkImport(urls)
    }

    extractDataFromURL(url: string){
        const urlParts = url.split('/')
        const contractAddress = urlParts[urlParts.length - 2]
        const tokenId = urlParts[urlParts.length - 1]
        return {
            contractAddress,
            tokenId
        }
    }

    async import(contractAddress: string, tokenId: string): Promise<CardInterface>{
        const token = new ERC721Card(this.web3, contractAddress, tokenId)
        const card = await token.getCardInterface()
        return card
    }

    async importFromUrl(url:string): Promise<CardInterface>{
        const { contractAddress, tokenId } = this.extractDataFromURL(url)
        return this.import(contractAddress, tokenId)
    }

    wait(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async bulkImport(urls: Array<string>){
        const cards = []
        await this.wait(100)
        for (let i = 0; i < urls.length; i++){
            await this.wait(500)
            const url = urls[i]
            console.log('fetching', url)
            const { contractAddress, tokenId } = this.extractDataFromURL(url)
            console.log('extracted', contractAddress, tokenId)
            const card = await this.import(contractAddress, tokenId)
            cards.push(card)
        }

        console.log(cards)
    }
}