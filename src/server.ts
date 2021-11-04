import express from 'express' 
import path from 'path'

const PORT = 7070 

const app = express()

app.use('/', express.static(path.join(__dirname, '../www/')))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})