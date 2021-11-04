import { expect } from 'chai'
import { it, describe, beforeEach  } from "mocha"
import Web3 from 'web3'
import { NFT } from '../../src/NFT'

describe('Base NFT', () => {
    const web3 = new Web3('wss://mainnet.infura.io/ws/v3/66de142eab66402fb428a78d2ce65fe1')
    const contractAddress: string = '0x3f4a885ed8d9cdf10f3349357e3b243f3695b24a'
    const tokenId:string = '7218'

    it ('should load a valid nft', async () => {
        const token = new NFT(web3, contractAddress, tokenId)
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toNumber()).to.equal(parseInt(tokenId))
    })

    it ('should load using a stringified tokenId', async () => {
        const tokenIdHex = parseInt(tokenId).toString(16)
        const token = new NFT(web3, contractAddress, `0x${tokenIdHex}`)
        // @ts-ignore
        expect(token.contractAddress).to.equal(contractAddress)
        // @ts-ignore
        expect(token.tokenId.toNumber()).to.equal(parseInt(tokenId))
    })

    it ('should exercise `decodeReturnedParameters`', async () => {
        const tokenIdHex = parseInt(tokenId).toString(16)
        const token = new NFT(web3, contractAddress, `0x${tokenIdHex}`)

        const rawResponse = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003a697066733a2f2f516d506b37364d6f32744446635437766b4d61377865324532316a38724e6159764748733868614e5173363533652f37323138000000000000'
        const parsed = 'ipfs://QmPk76Mo2tDFcT7vkMa7xe2E21j8rNaYvGHs8haNQs653e/7218'
        // @ts-ignore
        const out = token.decodeReturnedParameters([{
            name: 'tokenURI',
            type: 'string'
        }], rawResponse)

        expect(out.tokenURI).to.equal(parsed)
    })

})