import { object, number, string, array } from 'yup'
import AppError from '@errors/AppError'
import '@config/yup.locale.pt-br'

class EstudoValidators {
  async store(req, res, next) {
    const body = object().shape({
      mensagem: string()
        .label('Mensagem')
        .max(255)
        .required(),
    })

    await body.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) });

    return next()
  }
}

export default new EstudoValidators()