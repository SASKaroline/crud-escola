const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())




const professoresRouter = require('./routes/professores')
app.use(professoresRouter)







app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
    })