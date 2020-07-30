//importar
const sqlite3 = require("sqlite3").verbose();

//criar obj db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizr obj bd para operacoes
db.serialize(() => {

    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    const query = `INSERT INTO places(
                        image,
                        name,
                        address,
                        address2,
                        state,
                        city,
                        items
                    ) VALUES(?,?,?,?,?,?,?);`

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Paperside",
        "Joãoteste",
        "São Mateus",
        "456",
        "Francisco Beltrão",
        "Residuos Eletronicos, lâmpada"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this) //quando this nao utilizar arowfunction
    }

    db.run(query, values, afterInsertData ) //sem parenteses executa depois  

    db.all(`SELECT * FROM places WHERE city LIKE '%anc%'`, function(err, rows){
        if (err) {
            return console.log(err)
        }
        console.log("aqui estão os registros")
        console.log(rows)
    })

    db.run("DELETE FROM places WHERE id = ?" , [1], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Excluido com sucesso!")
    })*/

})
