import { Request, Response } from 'express'
/*
index, create, store, show, edit, update, destroy
*/
class UsuarioController {
  async index(req: Request, res: Response): Promise<Response> {
    return res.status(200).send()
  }
}

export default new UsuarioController()