import { NFT } from './NFT'
import superagent from 'superagent'
import { keccak256 } from 'web3-utils'
import { CardInterface } from './interfaces/CardInterface'
import Web3 from 'web3'



export class ERC721 extends NFT{
    private tokenURI?: string
    private name?: string
    private symbol?: string

    constructor(web3: Web3, contractAddress: string, tokenId: string){
        super(web3, contractAddress, tokenId)
    }

    public async getTokenUri(): Promise<string> {
        return new Promise( async (resolve, reject) => {
            try {
                if (!this.tokenId) throw new Error('Token ID is not set')

                const encoded = this.web3.eth.abi.encodeFunctionCall({
                    name: 'tokenURI',
                    type: 'function',
                    inputs: [{
                        type: 'uint256',
                        name: '_tokenId'
                    }]
                }, [`0x${this.tokenId.toString(16)}`]);

                const res = await this.web3.eth.call({
                    to: this.contractAddress,
                    data: encoded
                })

                const out = this.decodeReturnedParameters([{
                    name: 'tokenURI',
                    type: 'string'
                }], res)
                this.tokenURI = out.tokenURI
                resolve(out.tokenURI)
                
            } catch (e){
                reject(e)
            }
        })

    }

    protected replaceIpfsWithGateway(ipfsUrl: string){
        if (ipfsUrl.includes('ipfs://')){
            return ipfsUrl.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/')
        }
        return ipfsUrl
    }

    private metadata?:any
    public async getMetadata(){
        if (this.metadata){
            return this.metadata
        }
        if (!this.tokenURI){
            this.tokenURI = await this.getTokenUri()
        }


        if (this.tokenURI.includes('ipfs://')) {
            this.tokenURI = this.replaceIpfsWithGateway(this.tokenURI)
        }

        if (this.tokenURI.includes('http')){
            const httpRes = await superagent.get(this.tokenURI)
            const res = httpRes.body 
            this.metadata = res
            return res
        }
    }

    public async getName(){
        if (!this.tokenId) throw new Error('Token ID is not set')
        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'name',
            type: 'function',
            inputs: []
        }, []);

        const res = await this.web3.eth.call({
            to: this.contractAddress,
            data: encoded
        })

        const out = this.decodeReturnedParameters([{
            name: 'name',
            type: 'string'
        }], res)

        this.name = out.name 
        return this.name
    }

    public async getSymbol(){
        if (!this.tokenId) throw new Error('Token ID is not set')
        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'symbol',
            type: 'function',
            inputs: []
        }, []);

        const res = await this.web3.eth.call({
            to: this.contractAddress,
            data: encoded
        })

        const out = this.decodeReturnedParameters([{
            name: 'symbol',
            type: 'string'
        }], res)

        this.symbol = out.symbol 
        return this.symbol
    }

    

    


}
