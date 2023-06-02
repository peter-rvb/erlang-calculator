const express = require("express")
const router = express.Router()

// ERLANG
//import { getNumberOfAgents } from 'erlang-c-js';
const erlang = require('erlang-c-js')

router.get('/', (req, res) => {
    res.send('Previous Erlang Results')
})

router.get('/new', (req, res) => {
    //res.send('New Erlang Calculation')
    res.render("erlang/new")
})

// TRIGGERED ON ERLANG/NEW URL STATIC VIEW (erlang/new.js)
router.post('/', (req, res) => {
    console.log(req.body)

    var volumes = req.body.volumes
    var intervalLength = req.body.intervalLength
    var aht = req.body.aht
    var targetServiceLevel = req.body.targetServiceLevel
    var targetTime = req.body.targetTime
    var maxOccupancy = req.body.maxOccupancy
    var shrinkage = req.body.shrinkage

    var result = erlang.getNumberOfAgents(volumes, intervalLength, aht, targetServiceLevel, targetTime, maxOccupancy, shrinkage)

    console.log(`RESULT: ${result}`)

    res.send(result.toString())
})

// DYNAMIC ROUTE
router
    .route("/:id")
    .get((req, res) => {
        //console.log(req.erlang)
        res.send(`Get Erlang Calculation with ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update Erlang Calculation with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete Erlang Calculation with ID ${req.params.id}`)
    })

// DUMMY DATA
const erlangs = [{ name: "Calc 1" }, { name: "Calc 2" }]

// MIDDLEWARE - ran whenever id is passed in URL 
router.param("id", (req, res, next, id) => {
    req.erlang = erlangs[id]
    next()
})

module.exports = router