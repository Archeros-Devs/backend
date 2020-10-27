import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import UsuariosRepository from '@repository/UsuarioRepository'
import Usuario from '@entity/Usuario'
import Profissoes from '@entity/Profissoes'
import Escolaridade from '@entity/Escolaridade'
import AppError from 'src/errors/AppError'

import { strip } from "../utils/cpf";
import { capitalize } from "src/utils/string";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body
    const { ACCESS_TOKEN_SECRET } = process.env

    if (!email || !senha) return res.status(400).json({ error: 'Usuário e Senha obrigatório' })

    const usuario = await UsuariosRepository.findOneByEmail(email)
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' })

    const verificarSenha = await argon2.verify(usuario.senha, senha)
    if (!verificarSenha) return res.status(401).json({ error: 'Senha incorreta' })
    delete usuario.senha

    const accessToken = jwt.sign({ ...usuario, senha: undefined }, ACCESS_TOKEN_SECRET, {
      expiresIn: '24h'
    })

    return res.status(200).json({ ...usuario, img: '', token: accessToken })
  }
}

export default new AuthController()