import Web3 from 'web3'
import superagent from 'superagent'
import { NFT } from './NFT'

export class ERC1155 extends NFT{

    constructor(web3: Web3, contractAddress: string, tokenId: string){
        super(web3, contractAddress, tokenId)
    }


    public async getMetadataUri(): Promise<string> {
        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'uri',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'id'
            }]
        }, [`0x${this.tokenId.toString(16)}`]);

        const res = await this.web3.eth.call({
            to: this.contractAddress,
            data: encoded
        })

        const out = this.decodeReturnedParameters([{
            name: 'metadataUri',
            type: 'string'
        }], res)

        // replace the id field with the proper value 
        const uri = out.metadataUri.replace('0x{id}', this.tokenId.toString())
        return uri
    }

    public async getMetadata(){
        const uri = await this.getMetadataUri()
        const httpRes = await superagent.get(uri)

        return httpRes.body
    }

}

/*
const main = async () => {
    const erc1155 = new ERC1155('0x495f947276749ce646f68ac8c248420045cb7b5e', '15856337856917357433264578137314620566549072045013887703133171590393722044417')
    const uri = await erc1155.getMetadataUri()
    console.log(uri)
    const metadata = await erc1155.getMetadata(uri)
    console.log(metadata)
}

main()*/