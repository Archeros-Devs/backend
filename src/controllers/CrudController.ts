import Categoria from '@entity/Categoria'
import { Request, Response } from 'express'
/*
index, create, store, show, edit, update, destroy
*/
class CrudController {
  index = (Entity) => {
    return async (req: Request, res: Response): Promise<Response> => {
      const where = req.query
      const elements = await Entity.find({ where })
      return res.status(200).json(elements)
    }
  }
}

export default new CrudController()