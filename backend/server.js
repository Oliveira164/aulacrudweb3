const express = require("express")
const mysql = require("mysql2")
const cors =  require ("cors")

const app = express()
app.use(cors())
app.use(express.json())

const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "escola",
    port: 3306
})

conexao.connect((erro) =>{
    if(erro){
        console.log("Erro", erro)
    }else{
        console.log("MySQL conectado")
    }
})

app.post("/alunos", (req, res)=>{
    const {nome, email, curso} = req.body
    const sql = `INSERT INTO alunos(nome,email,curso) VALUES (?,?,?)`

    conexao.query(
        sql,
        [nome, email, curso],
        (erro, resultado)=>{
            if(erro){
                console.log(erro)
                res.status(500).json(erro)
            } else {
                res.json(resultado)
            }
        }
    )
})

app.get("/alunos", (req, res)=>{
    conexao.query(
        "SELECT * FROM alunos",
        (erro, resultado)=> {
            if(erro){
                console.log('Erro: ', erro)
                res.status(500).json(erro)
            } else {
                res.json(resultado)
            }
        }
    )
})

app.put("/alunos/:id", (req, res)=> {
    const {id} = req.params
    const {nome, email, curso} = req.body

    const sql = `UPDATE alunos SET nome=?, email=?, curso=? WHERE id=?`

    conexao.query(
        sql,
        [nome, email, curso, id],
        (erro, resultado)=>{
            if(erro){
                console.log(erro)
                res.status(500).json(erro)
            } else {
                res.json(resultado)
            }
        }
    )
})

app.delete("/alunos/:id", (req, res)=>{
    const {id} = req.params
    const sql = "DELETE FROM alunos WHERE id =?"

    conexao.query(
        sql,
        [id],
        (erro, resultado)=>{
            if(erro){
                console.log(erro)
                res.status(500).json(erro)
            } else {
                res.json(resultado)
            }
        }
    )
})

app.listen(3001, ()=>{
    console.log("Servidor rodando")
})

