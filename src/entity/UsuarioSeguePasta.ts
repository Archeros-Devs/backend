import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import Pasta  from "./Pasta";
import Usuario from "./Usuario";

@Entity("usuario_segue_pasta")
export default class UsuarioSeguePasta extends BaseEntity {
  @Column("int", { primary: true })
  id_pasta: number;

  @Column("int", { primary: true })
  id_usuario: number;

  @UpdateDateColumn()
  atualizado_em: Date | null;
  
  @CreateDateColumn()
  criado_em: Date;

  @ManyToOne(() => Pasta, (pasta) => pasta.seguidores)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;
}
