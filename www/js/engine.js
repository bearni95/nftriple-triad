window.board = new NFTripleTriad.Board()
window.board.start()

const main = async () => {

    const token = new NFTripleTriad.CardImporter()
    const card = await token.importFromUrl('https://opensea.io/assets/0x3f4a885ed8d9cdf10f3349357e3b243f3695b24a/7211')
    console.log('card', card)
    
}

main()
