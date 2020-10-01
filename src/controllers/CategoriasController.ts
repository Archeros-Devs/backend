import Categoria from '@entity/Categoria'
import { Request, Response } from 'express'
/*
index, create, store, show, edit, update, destroy
*/
class CategoriasController {
  async index(req: Request, res: Response): Promise<Response> {
    const categorias = await Categoria.find()
    return res.status(200).json(categorias)
  }
}

export default new CategoriasController()