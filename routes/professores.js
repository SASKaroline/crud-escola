const express = require('express')
const router = express.Router()




let listaProfessores = [
  {
    id: 1,
    nome: "Karoline",
    cpf: "123.252.959.52",
    email: "karolcarol@gmail.com",
    curso: "Desenvolvimento de Sistemas", 
    disciplina: "Estrutura de dados"
  },
  {
    id: 2,
    nome: "Yori",
    cpf: "321.456.789.00",
    email: "yoriyamagi@hotmail.com ",
    curso: "Redes de Computadores",
    disciplina: "Segurança de redes"
  },
]

router.get('/professores', (req, res, next) => {
  res.json(listaProfessores)
})


router.get('/professores/:id', (req, res, next) => {

  const id = req.params.id
  
  const professor = listaProfessores.find(professor => professor.id == id)
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!!!" })
  }
  res.json(professor)
})


router.post('/professores', (req, res, next) => {
  const { nome, cpf, email, curso, disciplina } = req.body

  if (!nome || !cpf || !email || !curso || !disciplina) {
    return res.status(400).json({ error: "Campos obrigatórios a serem preenchidos! (Nome, CPF, E-mail, Curso, Disciplina)" })
  }

 
  if (listaProfessores.some(pessoa => pessoa.cpf == cpf)) {
    return res.status(409).json({ error: "CPF já cadastrado!!!" })
  }

  const novoProfessor = {
    id: Date.now(),
    nome,
    cpf,
    email,
    curso,
    disciplina
  }

  listaProfessores.push(novoProfessor)
  res.status(201).json({ message: "Professor cadastrada com sucesso!", novoProfessor })
})


router.put('/professores/:id', (req, res, next) => {
  const id = req.params.id
  const professor = listaProfessores.find(professor => professor.id == id)
  
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!" })
  }
  
  const { nome, email, curso, disciplina, cpf } = req.body
  if (!nome || !email || !curso || !disciplina || !cpf) {
    return res.status(400).json({ error: "Campos obrigatórios a serem preenchidos! (Nome, CPF, E-mail, Curso, Disciplina)" })
  }
  
  professor.nome = nome
  professor.email = email
  professor.curso = curso
  professor.disciplina = disciplina
  professor.cpf = cpf
  
  res.json({ message: "Professor atualizada com sucesso!!!", professor })
})


router.delete('/professores/:id', (req, res, next) => {
  const id = req.params.id
  
  const professor = listaProfessores.find(professor => professor.id == id)
  if (!professor) {
    return res.status(404).json({ error: "pessoa não encontrada!!!"})
  }

  listaProfessores = listaProfessores.filter(professor => professor.id != id)
  res.json({ message: "Professor excluido com sucesso!!!"})
})



module.exports = router