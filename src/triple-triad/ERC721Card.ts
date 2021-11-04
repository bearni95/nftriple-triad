import { keccak256 } from "js-sha3";
import Web3 from "web3";
import { ERC721 } from "..";
import { CardInterface } from "../interfaces/CardInterface";

export class ERC721Card extends ERC721 {

    constructor(web3: Web3, contractAddress: string, tokenId: string){
        super(web3, contractAddress, tokenId)
    }
    
    public async getCardStats(){
        if (!this.tokenId){
            throw new Error('token id required to generate card stats')
        }
        const seed = keccak256(`${this.contractAddress}/${this.tokenId}`)

        const parts = seed.match(/.{1,16}/g)
        if (!parts) return
        let statPoints = 11 // for lvl1 cards

        const stats = []
        for (let i = 0; i < parts?.length; i++){
            const part = parts[i]
            const intSeed = parseInt(part, 16)

            let stat = (intSeed % 5) + 1
            
            if (statPoints - stat < 0){
                stat = statPoints
            }

            stats.push(stat)
            statPoints -= stat
        }


        return {
            top: stats[0],
            left: stats[1],
            right: stats[2],
            bottom: stats[3]
        }
    }

    async getCardInterface(){
        const metadata = await this.getMetadata()
        const stats = await this.getCardStats()

        return {
            contractAddress: this.contractAddress,
            tokenId: this.tokenId.toString(),
            name: metadata.name,
            description: metadata.description,
            image: this.replaceIpfsWithGateway(metadata.image),
            price:0,
            quantity:0,
            stats
        } as CardInterface
    }
}