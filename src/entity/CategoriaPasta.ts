import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Pasta  from "./Pasta";
import Categoria from "./Categoria";

@Entity("pasta_categoria")
export default class UsuarioAvaliaPasta extends BaseEntity {
  @Column("int", { primary: true })
  id_categoria: number;

  @Column("int", { primary: true, })
  id_pasta: number;

  @ManyToOne(() => Pasta, (pasta) => pasta.avaliacoes)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Categoria, (categoria) => categoria.categoria)
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id_categoria" }])
  categoria: Categoria;
}
