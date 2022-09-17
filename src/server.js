const app = require('./app')
const router = require('./router')
require('dotenv').config()

app.use('/', router)
port = process.env.PORT
app.listen(port, () => console.log(`Rodando na porta: ${port}`))