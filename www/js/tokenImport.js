const importErc721Btn = document.querySelector('#importErc721Btn')
const contractAddressInput = document.querySelector('#contractAddressInput')
const tokenIdInput = document.querySelector('#tokenIdInput')
const cardDisplay = document.querySelector('#cardDisplay')

importErc721Btn.addEventListener('click', async () => {
    const token = new NFTripleTriad.CardImporter()
    const contractAddress = contractAddressInput.value
    const tokenId = tokenIdInput.value
    const cardInterface = await token.import(contractAddress, tokenId)
    console.log('cardInterface', cardInterface)

    const card = new NFTripleTriad.Card(cardDisplay, 'red', cardInterface)
    console.log('card', card)
})