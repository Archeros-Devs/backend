import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import Pasta from "./Pasta";
import Usuario from "./Usuario";
import AppError from './../errors/AppError';

@Entity("usuario_avalia_pasta")
export default class UsuarioAvaliaPasta extends BaseEntity {
  @Column("int", { primary: true })
  id_usuario: number;

  @Column("int", { primary: true, })
  id_pasta: number;

  @Column("tinyint", { width: 1 })
  avaliacao: number;

  @Column("varchar", { length: 50 })
  motivo: string;

  @UpdateDateColumn()
  atualizado_em: Date | null;

  @CreateDateColumn()
  criado_em: Date;

  @ManyToOne(() => Pasta, (pasta) => pasta.avaliacoes)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;

  static async avaliar(usuario: Usuario, pasta: Pasta, avaliacao: number, motivo?: string): Promise<UsuarioAvaliaPasta> {
    const id_usuario = usuario.id_usuario
    const id_pasta = pasta.id_pasta

    if (usuario.tipo_usuario > 0 && !motivo) {
      throw new AppError(400, 'Obrigatório informar o motivo')
    }

    const voto = await this.findOne({ id_usuario, id_pasta })
    if (voto) {
      voto.avaliacao = avaliacao
      voto.motivo = motivo
      return voto.save()
    }

    const novoVoto = new UsuarioAvaliaPasta()
    novoVoto.id_usuario = id_usuario
    novoVoto.id_pasta = id_pasta
    novoVoto.avaliacao = avaliacao
    novoVoto.motivo = motivo
    return novoVoto.save()
  }
}
