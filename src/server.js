const express = require("express") /*framework nodejs*/
const server = express()

const db = require("./database/db")

server.use(express.static("public"))

server.use(express.urlencoded({extended: true})) /*body*/ 

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//server.get("/", (req, res) => { //SEM NUNJUCKS
//    res.sendFile(__dirname + "/views/index.html")
server.get("/", (req, res) => {
    return res.render("index.html",{title: "titulo"}) 
})

server.get("/teste", (req, res) => {
    console.log("test")
    return res.render("testes.html")
}) 

server.get("/create-point", (req, res) => { 
    console.log(req.body)

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    console.log(req.body)

    function afterInsertData(err){
        if(err){
            console.log(err)
        }else{
            console.log("gravado com sucesso")
        }
        return res.render("create-point.html", {saved: true})
    }
    
    const query = `INSERT INTO places (
                    image,
                    name,
                    address,
                    address2,
                    state,
                    city,
                    items)
                    VALUES(?,?,?,?,?,?,?);`
    
    const value = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items ]

    db.run(query,value, afterInsertData)
} )

server.get("/search", (req,res) => {
    const search = req.query.text

    if (search == "") {
        return res.render("search-results.html", {total: 0})
    }
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", {places:rows, total:total})
    })
})

server.get("/searchall", (req,res) => {
    db.all(`SELECT * FROM places`,function(err,rows){
        const total = rows.length
        return res.render("search-results.html", {places: rows, total: total})
    })
})
server.listen(3000)
