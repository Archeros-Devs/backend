import { Request, Response } from 'express'
import Escolaridade from './../entity/Escolaridade';
/*
index, create, store, show, edit, update, destroy
*/
class EscolaridadesController {
  async index(req: Request, res: Response): Promise<Response> {
    const escolaridade = await Escolaridade.find()
    return res.status(200).json(escolaridade)
  }
}

export default new EscolaridadesController()