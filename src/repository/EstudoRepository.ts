
import Estudo from '@entity/Estudo';
import Pasta from '@entity/Pasta';

class EstudoRepository {
  public async estudosPasta(pasta: Pasta, page, limit): Promise<[Estudo[], number]> {
    const estudos = Estudo
      .createQueryBuilder('estudo')
      .innerJoin("estudo.usuario", "usuario", "usuario.id_usuario = estudo.id_usuario")
      .select(['estudo.id_mensagem', 'estudo.mensagem', 'estudo.tipo', 'usuario.nome', 'usuario.url_img', 'usuario.tipo_usuario'])
      .where("estudo.id_pasta = :id_pasta", { id_pasta: pasta.id_pasta })
      .skip((page - 1) * limit)
      .take(limit)

    return estudos.getManyAndCount()
  }
}

export default new EstudoRepository();