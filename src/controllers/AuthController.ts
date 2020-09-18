import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import UsuariosRepository from '@repository/UsuarioRepository'
import Usuario from '@entity/Usuario'
import Profissoes from '@entity/Profissoes'
import Escolaridade from '@entity/Escolaridade'
import AppError from 'src/errors/AppError'

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body
    const { ACCESS_TOKEN_SECRET } = process.env

    if (!email || !senha) return res.status(400).json({ error: 'Email e Senha obrigatório' })

    const usuario = await UsuariosRepository.findByEmail(email)
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' })

    const verificarSenha = await argon2.verify(usuario.getSenha(), senha)
    if (!verificarSenha) return res.status(401).json({ error: 'Usuário não encontrado' })

    const token = jwt.sign({ ...usuario, senha: undefined }, ACCESS_TOKEN_SECRET)

    return res.status(200).json({ token })
  }

  async cadastro(req: Request, res: Response): Promise<Response> {
    const { cpf, nome, email, id_profissao, senha, id_escolaridade } = req.body

    const buscarUsuario = await Usuario.find({ where: [{ cpf }, { email }] })
    if (buscarUsuario) throw new AppError(400, 'CPF ou Email já cadastrado')

    const profissao = await Profissoes.findOne(id_profissao)
    if (!profissao) throw new AppError(404, 'Profissão não encontrada')

    const escolaridade = await Escolaridade.findOne(id_escolaridade)
    if (!escolaridade) throw new AppError(404, 'Escolaridade inválida')

    const usuario = await new Usuario()
      .setCpf(cpf)
      .setNome(nome)
      .setEmail(email)
      .setProfissao(profissao)
      .setEscolaridade(escolaridade)
      .setSenha(senha)

    await usuario.save()

    return res.status(200).json(usuario)
  }
}

export default new AuthController()