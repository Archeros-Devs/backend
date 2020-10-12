import AppError from '../errors/AppError';
import { isValid } from '../utils/cpf'
import { object, number, string } from 'yup'
import '@config/yup.locale.pt-br'

class UsuarioValidator {
  async cadastro(req, res, next) {
    const { cpf } = req.body
    const schema = object().shape({
      cpf: string()
        .label('CPF')
        .test('CPF', 'CPF inválido', () => isValid(cpf))
        .required(),
      nome: string()
        .label('Nome')
        .max(150, 'Nome muito grande')
        .required(),
      genero: string()
        .label('Gênero')
        .max(10)
        .equals(['masculino', 'feminino'])
        .nullable(),
      email: string()
        .label('E-mail')
        .email()
        .required(),
      id_profissao: number()
        .label('Profissão')
        .positive()
        .integer()
        .required(),
      senha: string()
        .label('Senha')
        .max(40)
        .required(),
      url_img: string()
        .label('Imagem')
        .max(255)
        .notRequired(),
      id_escolaridade: number()
        .label('Escolaridade')
        .positive()
        .integer()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false })
      .catch((e) => { throw new AppError(400, e) });

    return next()
  }
}

export default new UsuarioValidator()