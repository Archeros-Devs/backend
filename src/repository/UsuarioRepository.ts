
import Usuario from '@entity/Usuario';

class UsuariosRepository {
  public async findByEmail(email: string): Promise<Usuario> {
    return await Usuario
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('email = :email', { email: email })
      .getOne()
  }
}

export default new UsuariosRepository();