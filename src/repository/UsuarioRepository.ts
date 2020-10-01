
import Usuario from '@entity/Usuario';

class UsuariosRepository {
  static async findOneByEmail(email: string): Promise<Usuario> {
    return await Usuario
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('email = :email', { email: email })
      .getOne()
  }

  static async findByEmail(email: string): Promise<Usuario> {
    return await Usuario
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('email = :email', { email: email })
      .getOne()
  }

  static async findAllAdmins(page: any = 1, limit: any = 20) {
    return Usuario
      .createQueryBuilder('usuario')
      .innerJoinAndMapOne("usuario.profissao", "usuario.profissao", "profissao")
      .innerJoinAndMapOne("usuario.escolaridade", "usuario.escolaridade", "escolaridade")
      .where('tipo_usuario = :tipo1', { tipo1: 1 })
      .orWhere('tipo_usuario = :tipo2', { tipo2: 2 })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()
  }

  static async findAllUsers(page: any = 1, limit: any = 20) {
    return Usuario
      .createQueryBuilder('usuario')
      .innerJoinAndMapOne("usuario.profissao", "usuario.profissao", "profissao")
      .innerJoinAndMapOne("usuario.escolaridade", "usuario.escolaridade", "escolaridade")
      .where('tipo_usuario = :tipo', { tipo: 0 })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()
  }
}

export default UsuariosRepository;