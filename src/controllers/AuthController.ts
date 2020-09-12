import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import UsuariosRepository from '@repository/UsuarioRepository'

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { documento = '123', senha = '123' } = req.body
    const { ACCESS_TOKEN_SECRET } = process.env

    if (!documento || !senha) return res.status(400).json({ error: 'Usuário e Senha obrigatório' })

    const usuario = await UsuariosRepository.getUsuarioByDocumento(documento)
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' })

    const verificarSenha = await argon2.verify(usuario.senha, senha)
    if (!verificarSenha) return res.status(401).json({ error: 'Usuário não encontrado' })

    const accessToken = jwt.sign({ ...usuario }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    })

    const options = {} // { secure: true, httpOnly: true }
    return res.status(200).cookie("token", accessToken, options).send('ok')
  }

  async cadastro(req: Request, res: Response): Promise<Response> {

    return res.status(200).json({})
  }
}

export default new AuthController()