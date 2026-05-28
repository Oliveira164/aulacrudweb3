import { useEffect, useState } from "react"
import axios from "axios"

function App(){
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setIdAtual] = useState(null)

  const API_URL = "http://localhost:3001"

  async function buscarAlunos(){
    try {
      const resposta = await axios.get(`${API_URL}/alunos`)
      setAlunos(resposta.data)
    } catch(erro) {
      console.log('Erro ao buscar alunos: ', erro)
    }
  }

  useEffect(()=>{buscarAlunos();},[])

  async function salvar(e){
    e.preventDefault()
    const aluno = {nome, email, curso}

    try {
      if(editando){
        await axios.put(`${API_URL}/alunos/${idAtual}`, aluno)
        setEditando(false)
        setIdAtual(null)
      } else {
        await axios.post(`${API_URL}/alunos`, aluno)
      }
      limparFormulario()
      buscarAlunos()
    } catch(erro) {
      console.log('Erro ao salvar:', erro)
    }
  }

  async function excluir(id){
    try {
      await axios.delete(`${API_URL}/alunos/${id}`)
      buscarAlunos()
    } catch(erro) {
      console.log('Erro ao excluir:', erro)
    }
  }

  function limparFormulario(){
    setNome('')
    setEmail('')
    setCurso('')
  }

  function editar(aluno){
    setNome(aluno.nome)
    setEmail(aluno.email)
    setCurso(aluno.curso)
    setIdAtual(aluno.id)
    setEditando(true)
  }

  return(
    <div style={{padding:20}}>
      <h1>CRUD de Alunos</h1>
      <form onSubmit={salvar}>
        <input 
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(texto)=>setNome(texto.target.value)}
        />
        <br />
        <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(texto)=>setEmail(texto.target.value)}
        />
        <br />
        <input 
        type="curso"
        placeholder="Curso"
        value={curso}
        onChange={(texto)=>setCurso(texto.target.value)}
        />

        <button type="submit">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <hr />

      {
        alunos.map((aluno)=>(
        <div key={aluno.id}>
          <h3>{aluno.nome}</h3>
          <p>{aluno.email}</p>
          <p>{aluno.curso}</p>
          <button onClick={()=> editar(aluno)}>Editar</button>
          <button onClick={()=> excluir(aluno.id)}>Excluir</button>
          <hr />
        </div>
        ))
      }
    </div>
  )
}
export default App