const express = require('express')
const app = express()

const erlang = require('erlang-c-js')

app.set('view engine', 'ejs')
app.use(logger)

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("Here")
    //res.sendStatus(200)
    /*
    res.status(200).json( {
        "message" : "Hello World"
    })
    */
   res.render("index", { "message" : "Peter" })
})

const erlangRouter = require('./routes/erlang')
app.use('/erlang', erlangRouter)

// MIDDLEWARE THAT LOGS URL EVERYTIME BECAUSE IT'S DEFINED BEFORE EVERYTHING (SEE LINE 5)
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000)