import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Usuario from "./Usuario";
import Pasta  from "./Pasta";

@Entity("categoria")
export default class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id_categoria" })
  id_categoria: number;

  @Column("varchar", { name: "categoria", length: 50 })
  categoria: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.categorias)
  @JoinTable({
    name: "interesses",
    joinColumns: [{ name: "id_categoria", referencedColumnName: "id_categoria" }],
    inverseJoinColumns: [{ name: "id_usuario", referencedColumnName: "id_usuario" }]
  })
  usuarios: Usuario[];

  @ManyToMany(() => Pasta, (pasta) => pasta.categorias)
  @JoinTable({
    name: "pasta_categoria",
    joinColumns: [{ name: "id_categoria", referencedColumnName: "id_categoria" }],
    inverseJoinColumns: [{ name: "id_pasta", referencedColumnName: "id_pasta" }]
  })
  pastas: Pasta[];
}
