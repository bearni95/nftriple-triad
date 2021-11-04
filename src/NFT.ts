import Web3 from 'web3'
import BN from 'bn.js'

export class NFT {
    protected web3: Web3 
    protected contractAddress: string
    protected tokenId: BN

    protected decodeReturnedParameters(params: Array<{type: string, name: string}>, res: string): any {
        const decoded = this.web3.eth.abi.decodeParameters(params.map(p => p.type), res)
        const out:any = {}
        for (let i = 0; i < params.length; i++) {
            out[params[i].name] = decoded[i]
        }
        return out
    }

    constructor(web3:Web3, contractAddress: string, tokenId: string){
        this.web3 = web3
        this.contractAddress = contractAddress 
        this.tokenId = this.web3.utils.toBN(tokenId)
    }
}
