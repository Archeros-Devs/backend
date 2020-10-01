import Usuario from '@entity/Usuario';
import AppError from '@errors/AppError';
import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: Usuario
    }
  }
}

const decrypt = (bearerToken: string): Promise<Usuario> => {
  const { ACCESS_TOKEN_SECRET } = process.env
  return new Promise((resolve, reject) => {
    jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, async (error, payload: Usuario) => {
      if (error) reject(new AppError(401, 'Falha ao verificar token'))
      resolve(payload)
    });
  })
}

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) throw new AppError(403, 'Token obrigatório')

  const [_, bearerToken] = bearerHeader.split(' ');
  const { id_usuario } = await decrypt(bearerToken)

  const usuario = await Usuario.findOne(id_usuario)
  if (!usuario) throw new AppError(404, 'Usuário bloqueado ou inexistente')

  req.user = usuario
  return next()
}

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) throw new AppError(403, 'Token obrigatório')

  const [_, bearerToken] = bearerHeader.split(' ');
  const { id_usuario } = await decrypt(bearerToken)

  const usuario = await Usuario.findOne(id_usuario)
  if (!usuario) throw new AppError(404, 'Usuário bloqueado ou inexistente')

  if (usuario.tipo_usuario === 0) throw new AppError(401, 'Usuário não autorizado')

  req.user = usuario
  return next()
}