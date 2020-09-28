import Profissoes from '@entity/Profissoes'
import { Request, Response } from 'express'
/*
index, create, store, show, edit, update, destroy
*/
class ProfissoesController {
  async index(req: Request, res: Response): Promise<Response> {
    const profissoes = await Profissoes.find()
    return res.status(200).json(profissoes)
  }
}

export default new ProfissoesController()