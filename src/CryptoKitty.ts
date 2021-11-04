import { keccak256 } from 'js-sha3'
import Web3 from 'web3'
import superagent from 'superagent'
export class CryptoKitty {
    web3: Web3 

    constructor(){
        this.web3 = new Web3('wss://mainnet.infura.io/ws/v3/')
    }
    public async getKitty(id: number): Promise<any> {
        const value = `0x${id.toString(16)}`

        
        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'getKitty',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: '_id'
            }]
        }, [value]);

        const res = await this.web3.eth.call({
            to: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // contract address
            data: encoded
        })

        return this.decodeReturnedParameters([
            {
                type: 'bool',
                name: 'isGestating',
            },
            {
                type: 'bool',
                name: 'isReady',
            },
            {
                type: 'uint256',
                name: 'cooldownIndex',
            },
            {
                type: 'uint256',
                name: 'nextActionAt',
            },
            {
                type: 'uint256',
                name: 'siringWithId',
            },
            {
                type: 'uint256',
                name: 'birthTime',
            },
            {
                type: 'uint256',
                name: 'matronId',
            },
            {
                type: 'uint256',
                name: 'sireId',
            },
            {
                type: 'uint256',
                name: 'generation',
            },
            {
                type: 'uint256',
                name: 'genes',
            }
        ], res)
        /*
        const decoded = this.web3.eth.abi.decodeParameters([
        'bool', // isGestating,
        'bool', // isReady,
        'uint256', // cooldownIndex,
        'uint256', // nextActionAt,
        'uint256', // siringWithId,
        'uint256', // birthTime,
        'uint256', // matronId,
        'uint256', // sireId,
        'uint256', // generation,
        'uint256', // genes
        ], res);

        const keys = ['isGestating', 'isReady', 'cooldownIndex', 'nextActionAt', 'siringWithId', 'birthTime', 'matronId', 'sireId', 'generation', 'genes']
        const out:any = {}
        for (let i = 0; i < keys.length; i++) {
            out[keys[i]] = decoded[i]
        }
        return out*/
    }
    
    private decodeReturnedParameters(params: Array<{type: string, name: string}>, res: string): any {
        const decoded = this.web3.eth.abi.decodeParameters(params.map(p => p.type), res)
        const out:any = {}
        for (let i = 0; i < params.length; i++) {
            out[params[i].name] = decoded[i]
        }
        return out
    }

    public async getImageUrl(id: number): Promise<string> {
        const res = await superagent.get(`https://api.cryptokitties.co/kitties/${id}`)
        return res.body.image_url
    }

    public async tokenMetadata(id: number): Promise<any> {
        const value = `0x${id.toString(16)}`


        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'getMetadata',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: '_id'
            }]
        }, [value]);

        const res = await this.web3.eth.call({
            to: '0x3f4a885ed8d9cdf10f3349357e3b243f3695b24a', // NOT cryptokitties
            //to: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // contract address
            data: encoded
        })
        console.log('returned', res)
        //const res = await superagent.get(`https://api.cryptokitties.co/kitties/${id}`)
       
    }

    public async getTokenUri(id: number): Promise<string> {
        const value = `0x${id.toString(16)}`


        const encoded = this.web3.eth.abi.encodeFunctionCall({
            name: 'tokenURI',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: '_tokenId'
            }]
        }, [value]);

        const res = await this.web3.eth.call({
            to: '0x3f4a885ed8d9cdf10f3349357e3b243f3695b24a', // NOT cryptokitties
            data: encoded
        })

        const out = this.decodeReturnedParameters([{
            name: 'tokenURI',
            type: 'string'
        }], res)

        return out
    }

}

const main = async () => {
    const kitty = new CryptoKitty()
    /*
    const getKittyRes = await kitty.getKitty(229795)
    console.log('getKittyRes', getKittyRes)
    const imageUrl = await kitty.getImageUrl(229795)
    console.log('imageUrl', imageUrl)
    */
    const metadata = await kitty.tokenMetadata(7218)
    console.log(metadata)

    const uri = await kitty.getTokenUri(229795)
    console.log('uri', uri)
}

main()
