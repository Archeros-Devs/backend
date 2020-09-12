
import { EntityRepository, Repository } from 'typeorm';
import Usuario from '@entity/Usuario';

@EntityRepository(Usuario)
class UsuariosRepository extends Repository<Usuario> {
  public async getUsuarioByDocumento(documento: string): Promise<Usuario> {
    return await Usuario
      .createQueryBuilder()
      .where('documento = :documento', { documento: documento })
      .getOne()
  }
}

export default new UsuariosRepository();