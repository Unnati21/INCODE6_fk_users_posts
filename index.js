const express = require('express')
const morgan = require('morgan')
const bcrypt =require('bcryptjs')
const db = require('./database')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.set("view engine", "ejs")

app.post('/users', (req, res) => {
    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const cleanedEmail = email.toLowerCase().trim()

    db.none('INSERT INTO users(email, password) VALUES ($1, $2);', [cleanedEmail, hash])
    .then(() =>{
        res.send({
            email: cleanedEmail,
            password: hash
        })
    })
    .catch()
  
})
//add new Posts for users
app.post('/posts', (req, res) => {

    const { user_id, title, content } = req.body
     db.none('INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3);', [user_id, title, content])
   .then(() => {
        res.send(req.body)
   })
   .catch((err) => {
       console.log(err)
       res.send(err)
   })
})




app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))