import { object, number, string, array } from 'yup'
import AppError from '@errors/AppError'
import '@config/yup.locale.pt-br'

class PastaValidators {
  async avaliacao(req, res, next) {
    const body = object().shape({
      avaliacao: number()
        .min(-1)
        .max(1)
        .required()
    })

    body.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) })
      .then(() => next())
  }

  async criar(req, res, next) {
    const body = object().shape({
      nome: string()
        .max(150)
        .required(),
      descricao: string()
        .max(300)
        .required(),
      discussao: string()
        .max(255)
        .required(),
      localizacao: string()
        .max(300)
        .required(),
      categorias: array()
        .of(number()
          .min(1))
        .required()
    })

    body.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) })
      .then(() => next())
  }
}

export default new PastaValidators()