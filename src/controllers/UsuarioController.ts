import { Request, Response } from 'express'
import UsuarioRepository from '@repository/UsuarioRepository'
import AppError from '@errors/AppError'
import Usuario from '@entity/Usuario'
import Profissoes from '@entity/Profissoes'
import Escolaridade from '@entity/Escolaridade'
import Endereco from '@entity/Endereco'
import { strip as removerMascaraCpf } from '../utils/cpf'
import argon2 from 'argon2'
/* index, create, store, show, edit, update, destroy */

class UsuarioController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = req.query

    const [usuarios, total] = await UsuarioRepository.findAllUsers(page, limit)

    return res.status(200).json({ usuarios, total })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { cpf, nome, genero, email, id_profissao, senha, id_escolaridade } = req.body

    const buscarUsuario = await Usuario.findOne({ where: [{ cpf }, { email }] })
    if (buscarUsuario) throw new AppError(400, 'CPF ou Email já cadastrado')

    const profissao = await Profissoes.findOne(id_profissao)
    if (!profissao) throw new AppError(404, 'Profissão não encontrada')

    const escolaridade = await Escolaridade.findOne(id_escolaridade)
    if (!escolaridade) throw new AppError(404, 'Escolaridade inválida')

    const usuario = new Usuario()
    usuario.cpf = removerMascaraCpf(cpf)
    usuario.nome = nome
    usuario.genero = genero
    usuario.email = email
    usuario.profissao = profissao
    usuario.escolaridade = escolaridade
    usuario.senha = await argon2.hash(senha)

    await usuario.save()

    return res.status(200).json(usuario)
  }
  async show(req: Request, res: Response): Promise<Response> {
    let { id_usuario } = req.params
    if (req.user.tipo_usuario == 0) {
      id_usuario = req.user.id_usuario.toString()
    }

    const usuario = await Usuario.findOne(id_usuario, {
      relations: ['enderecos', 'profissao', 'escolaridade', 'seguindo', 'pastas']
    })
    return res.status(200).json(usuario)
  }
}

export default new UsuarioController()