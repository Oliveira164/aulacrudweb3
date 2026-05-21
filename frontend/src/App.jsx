import { useEffect, useState } from "react"
import axios from "axios"

function App(){
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setIdAtual] = useState(null)


  async function salvar(e){
    e.preventDefault()
    const aluno = [nome, email, curso]

    if(editando){
      await axios.put(`https://orange-space-guide-v6wvpxrjq9p6cxg99-3001.app.github.dev/${idAtual}`, aluno)
      setEditando(false)
      setIdAtual(null)
    } else {
      await axios.post("https://orange-space-guide-v6wvpxrjq9p6cxg99-3001.app.github.dev/", aluno)
      //limparFormulario()
      //buscarAlunos()
    }
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
    </div>
  )
}
export default App