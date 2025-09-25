const express = require('express');
const router = express.Router();

router.use(express.json());

let listaAlunos = [
    {
        id: 1,
        nome: "Vinicius Teixeira",
        email:"ViniBravo@gmail.com",
        cpf: "123.094.582-53",
        telefone:"(24) 98590-2576",
        dataNascimento: "30/09/1997"


    },
    {
        id: 2,
        nome: "Karoline Silva",
        email: "Karolzinha55@gmail.com",
        cpf: "567.186.554.25",
        telefone:"(51) 985622-7945",
        dataNascimento: "19/05/2006"    
    }
    ];
// CRUD de contatos (Create, Read, Update, Delete)

router.get('/alunos', (req, res, next) => {
    res.json(listaAlunos)
  })


// GET /alunos/:id
router.get('/alunos/:id', (req, res, next) => {

    const id = req.params.id

    const Aluno = listaAlunos.find(Aluno => Aluno.id == id)
    if (!Aluno) {
      return res.status(404).json({ error: "Aluno não encontrada!!!" })
    }
    res.json(Aluno)
  })

  // #Criação
  // POST /Alunos
  router.post('/alunos', (req, res, next) => {
    const { nome, cpf, telefone, email, dataNascimento } = req.body
    // Validando se todos os campos foram preenchidos
    if (!nome ||  !dataNascimento || !cpf || !telefone || !email) {
      return res.status(400).json({ error: "Campos obrigatórios a serem prenchidos: Nome, CPF, Telefone, Email e DataDeNascimento" })
    }

    // validar se o cpf já foi cadastrado
    if (listaAlunos.some(Aluno => Aluno.cpf == cpf)) {
      return res.status(409).json({ error: "CPF já cadastradO!!!" })
    }

    const novoAluno = {
      id: Date.now(),
      nome,
      cpf,
      telefone,
      email,
      dataNascimento
    }

    listaAlunos.push(novoAluno)
    res.status(201).json({ message: "Aluno cadastrada com sucesso", novoAluno })
  })

  // #Atualização
  // PUT /Alunos/:id
  router.put('/alunos/:id', (req, res, next) => {
    const id = req.params.id
    const Aluno = listaAlunos.find(Aluno => Aluno.id == id)
    // valido se a Aluno existe
    if (!Aluno) {
      return res.status(404).json({ error: "Aluno não encontrada!!!" })
    }
    // validando se os dados pra atualizar vinheram na requisição
    const { nome, email, cpf, telefone, dataNascimento } = req.body
    if (!nome || !email || !dataNascimento || !cpf || !telefone) {
      return res.status(400).json({ error: "nome, email, dataNascimento, cpf, telefone são obrigatórios!!!" })
    }
    // atualizo os dados da Aluno
    Aluno.telefone = telefone
    Aluno.cpf = cpf
    Aluno.nome = nome
    Aluno.email = email
    Aluno.dataNascimento = dataNascimento
    // responde com os dados da Aluno atualizados 
    res.json({ message: "Pessoa atualizada com sucesso!!!", Aluno })
  })

  // #Remoção
  // DELETE /Alunos/:id
  router.delete('/alunos/:id', (req, res, next) => {
    const id = req.params.id
    // validar se a Aluno não existe
    const Aluno = listaAlunos.find(Aluno => Aluno.id == id)
    if (!Aluno) {
      return res.status(404).json({ error: "Aluno não encontrada!!!"})
    }

    listaAlunos = listaAlunos.filter(Aluno => Aluno.id != id)
    res.json({ message: "Aluno excluida com sucesso!!!"})
  })


  // exportar o roteador
  module.exports = router