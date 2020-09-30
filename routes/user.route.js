const router = require('express').Router()


const users = [
    {
        id: 1,
        username: 'elodie',
        password: 'password'
    },
    {   
        id : 2,
        username: 'elias',
        password: 'lolo'
    }
]

router.use((req, res, next) => {
    //specific behaviour
    console.log('in user router')
    next()
})

router.get('/me', (req, res) => {

    if (typeof req.session.userId != 'number'){
        res.status(401)
        res.send({
            message : 'User not authenticated'
        })
        return
    }
    const user = users.find( u => u.id === req.session.userId)
    if(user){
        delete user.password
        res.json(user)
    }
    res.status(500)
    //erreur serveur pas user
    res.send({message : 'Server error'})
   
})

router.get('/:userId', (req, res) =>{
    console.log('userId', req.params.userId, typeof req.params.userId)
    const user = users.find(u => u.id === parseInt(req.params.userId))
    if (!user){
        res.status(404).send({
            message : 'User not found'
        })
        return
    }

    delete user.password
    res.json(user)
})


router.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log('req body', req.body)
    console.log('req username', req.body.username)
    console.log('req pass', req.body.password)
   // const user = users.find( function(u) { return u.username === username && u.password === password})

    const user = users.find(u => u.username === username && u.password === password)
    if (!user){
        res.status(401)
        res.json({ message: 'did not find the user' })
        return
    }
    //connecter l'utilisateur
    req.session.userId = user.id
    res.json({ message: 'ok' })

})

module.exports = router