
import Pasta from '@entity/Pasta';
import UsuarioAvaliaPasta from '@entity/UsuarioAvaliaPasta';
import Usuario from '@entity/Usuario';

class PastasRepository {
  public async pastas(usuario: Usuario, page, limit, homologada): Promise<[Pasta[], number]> {
    const pastas = Pasta
      .createQueryBuilder('pasta')
      .innerJoinAndMapOne("pasta.usuario", "pasta.usuario", "usuario")
      .leftJoinAndSelect("pasta.avaliacoes", "pasta.avaliacoes", "pasta.avaliacoes.id_usuario = :id_usuario AND pasta.avaliacoes.id_pasta = pasta.id_pasta", { id_usuario: usuario.id_usuario })
      .skip((page - 1) * limit)
      .take(limit)
      .where('pasta.deletado_em IS NULL')

    if (homologada == 1) pastas.andWhere('homologada_em IS NOT NULL')
    if (homologada == 0) pastas.andWhere('homologada_em IS NULL')
    return pastas.getManyAndCount()
  }

  public async pasta(id_pasta, id_usuario): Promise<Pasta> {
    const pastas = Pasta
      .createQueryBuilder('pasta')
      .innerJoinAndMapOne("pasta.usuario", "pasta.usuario", "usuario")
      .leftJoinAndSelect("pasta.avaliacoes", "pasta.avaliacoes", "pasta.avaliacoes.id_usuario = :id_usuario AND pasta.avaliacoes.id_pasta = pasta.id_pasta", { id_usuario })
      .where('pasta.id_pasta = :id_pasta', { id_pasta })
      .andWhere('pasta.deletado_em IS NULL')
    return pastas.getOne()
  }
}

export default new PastasRepository();