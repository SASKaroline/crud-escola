const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


const AlunosRouter = require('./routes/alunos')
app.use(AlunosRouter)



app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})