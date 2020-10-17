import { Request, Response } from 'express'
import Estudo from '@entity/Estudo';
import Pasta from '@entity/Pasta';
import { TIPO_ESTUDO } from 'src/constants/estudo.const';
import EstudoRepository from '@repository/EstudoRepository';

class EstudoController {
  async index(req: Request, res: Response): Promise<Response> {
    const usuario = req.user
    const { id_pasta, page = 1, limit = 25 } = req.params

    const pasta = await Pasta.findOne(id_pasta)
    if (!pasta) return res.status(404).json({ error: 'Pasta não encontrada' })

    const [estudos, total] = await EstudoRepository.estudosPasta(pasta, page, limit)

    return res.status(200).json({ estudos, total })
  }

  async store(req: Request, res: Response): Promise<Response> {
    const usuario = req.user
    const { id_pasta } = req.params
    const { mensagem } = req.body

    const pasta = await Pasta.findOne(id_pasta)
    if (!pasta) return res.status(404).json({ error: 'Pasta não encontrada' })

    const estudo = new Estudo()
    estudo.usuario = usuario
    estudo.pasta = pasta
    estudo.mensagem = mensagem
    estudo.tipo = TIPO_ESTUDO
    
    estudo.piii()
    await estudo.save()

    return res.status(200).json(estudo)
  }
}

export default new EstudoController()