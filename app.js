const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get('/', (req, res) => {
    res.json({hello : world})
})

app.get('/secret', (req, res) => {
    res.send('<h1> Secret paaage </h1>')
})

app.listen(port, () => {
    console.log('Express server is up')
})