const express = require('express')
const session = require('express-session')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'secretblabla', //permets de valider que le cookie a bien ete créé par notre serveur, user peut pas créer un cookie
    saveUninitialized : false, 
    resave : false
}))

app.use((req, res, next) => {
    console.log('truc')
    next()
})

app.get('/', (req, res) => {
    res.json({ hello: 'world' })
})


const userRoute = require('./routes/user.route.js')
app.use('/api/user', userRoute)

app.get('/secret', (req, res) => {
    console.log('req.query', req.query)
    res.send('<h1> Secret paaage </h1>')
})

app.listen(port, () => {
    console.log('Express server is up')
})