
import Pasta from '@entity/Pasta';
import UsuarioAvaliaPasta from '@entity/UsuarioAvaliaPasta';

class PastasRepository {
  public async pastas(page, limit, homologada): Promise<[Pasta[], number]> {
    const pastas = Pasta
      .createQueryBuilder('pasta')
      .innerJoinAndMapOne("pasta.usuario", "pasta.usuario", "usuario")
      .skip((page - 1) * limit)
      .take(limit)
      .where('pasta.deletado_em IS NULL')

    if (homologada == 1) pastas.andWhere('homologada_em IS NOT NULL')
    if (homologada == 0) pastas.andWhere('homologada_em IS NULL')
    return pastas.getManyAndCount()
  }
}

export default new PastasRepository();