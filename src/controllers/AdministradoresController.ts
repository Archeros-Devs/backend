import { Request, Response } from 'express'
import Usuario from '@entity/Usuario'
import UsuarioRepository from '@repository/UsuarioRepository'

class AdministradoresController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = req.query

    const [administradores, total] = await UsuarioRepository.findAllAdmins(page, limit)

    return res.status(200).json({ administradores, total })
  }
}

export default new AdministradoresController()