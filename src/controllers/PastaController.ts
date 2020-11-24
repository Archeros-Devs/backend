import { Request, Response } from 'express'
import PastaRepository from '@repository/PastaRepository'
import Pasta from '@entity/Pasta'
import UsuarioAvaliaPasta from '@entity/UsuarioAvaliaPasta'
import Usuario from '@entity/Usuario'
import Categoria from '@entity/Categoria'
import UsuarioSeguePasta from './../entity/UsuarioSeguePasta';
import { dateToMs } from './../utils/mobile';
// index, create, store, show, edit, update, destroy

class UsuarioController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10, homologada } = req.query
    const usuario = req.user

    const [pastas, total] = await PastaRepository.pastas(usuario, page, limit, homologada)


    const _pastas = pastas.map(p => ({
      ...p,
      criador: p.usuario.nome,
      avaliacao: p.avaliacoes[0]?.avaliacao || null
    }))

    return res.status(200).json({ pastas: _pastas, total })
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id_pasta } = req.params
    const { id_usuario } = req.user

    const pasta = await PastaRepository.pasta(id_pasta, id_usuario)

    const _pasta = {
      ...pasta,
      criador: pasta.usuario.nome,
      avaliacao: pasta.avaliacoes[0]?.avaliacao || null
    }

    return res.status(200).json({ pasta: _pasta, imgs: [] })
  }

  async store(req: Request, res: Response): Promise<Response> {
    const usuario = req.user
    const { nome, descricao, discussao, localizacao, categorias, latitude, longitude, id_origem } = req.body
    const pasta = new Pasta()

    pasta.usuario = usuario
    pasta.nome = nome
    pasta.descricao = descricao
    pasta.discussao = discussao
    pasta.localizacao = localizacao
    pasta.latitude = latitude
    pasta.longitude = longitude
    pasta.id_origem = id_origem
    pasta.categorias = await Categoria.findByIds(categorias)
    await pasta.save()

    return res.status(200).json(pasta)
  }

  async seguir(req: Request, res: Response): Promise<Response> {
    const usuario = req.user
    const id_pasta = parseInt(req.params.id_pasta)

    const pasta = await Pasta.findOne(id_pasta, { relations: ['avaliacoes'] })
    if (!pasta) return res.status(404).json({ error: 'Pasta não encontrada' })

    const sequindo = await UsuarioSeguePasta.seguir(usuario, pasta)

    return res.status(200).json(sequindo)
  }

  async avaliar(req: Request, res: Response): Promise<Response> {
    const usuario = req.user
    const id_pasta = parseInt(req.params.id_pasta)
    const { avaliacao, motivo } = req.body

    const pasta = await Pasta.findOne(id_pasta, { relations: ['avaliacoes'] })
    if (!pasta) return res.status(404).json({ error: 'Pasta não encontrada' })

    const voto = await UsuarioAvaliaPasta.avaliar(usuario, pasta, avaliacao, motivo)

    if (usuario.tipo_usuario > 0) await pasta.verificarHomologacao()
    return res.status(200).json(voto)
  }
}

export default new UsuarioController()  