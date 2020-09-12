import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Pasta  from "./Pasta";
import Usuario from "./Usuario";

@Entity("usuario_avalia_pasta")
export default class UsuarioAvaliaPasta {
  @Column("int", { primary: true })
  id_usuario: number;

  @Column("int", { primary: true, })
  id_pasta: number;

  @Column("tinyint", { width: 1 })
  avaliacao: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  criado_em: Date;

  @ManyToOne(() => Pasta, (pasta) => pasta.avaliacoes)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;
}
