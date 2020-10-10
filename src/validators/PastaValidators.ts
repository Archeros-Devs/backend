import { object, number, string, array } from 'yup'
import AppError from '@errors/AppError'
import '@config/yup.locale.pt-br'

class PastaValidators {
  async avaliacao(req, res, next) {
    const body = object().shape({
      avaliacao: number()
        .label('Avaliação')
        .min(-1)
        .max(1)
        .required()
    })

    await body.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) });

    return next()
  }

  async criar(req, res, next) {
    const body = object().shape({
      nome: string()
        .label('Nome')
        .max(150)
        .required(),
      descricao: string()
        .label('Descrição')
        .max(300)
        .required(),
      discussao: string()
        .label('Discussão')
        .max(255)
        .required(),
      localizacao: string()
        .label('Localização')
        .max(300)
        .notRequired(),
      categorias: array()
        .label('Categorias')
        .of(number()
          .min(1))
        .required()
    })

    await body.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) });

    return next()
  }
}

export default new PastaValidators()