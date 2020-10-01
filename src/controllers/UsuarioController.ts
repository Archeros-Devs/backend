import { Request, Response } from 'express'
import UsuarioRepository from '@repository/UsuarioRepository'
/* index, create, store, show, edit, update, destroy */

class UsuarioController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = req.query

    const [usuarios, total] = await UsuarioRepository.findAllUsers(page, limit)

    return res.status(200).json({ usuarios, total })
  }
}

export default new UsuarioController()