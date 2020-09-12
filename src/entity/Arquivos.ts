import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Pasta  from "./Pasta";
import Usuario from "./Usuario";

@Entity("arquivos")
export default class Arquivos {
  @PrimaryGeneratedColumn({ type: "int" })
  id_arquivo: number;

  @Column("int")
  id_usuario: number;

  @Column("int")
  id_pasta: number;

  @Column("varchar", { length: 255 })
  url: string;

  @Column("varchar", { length: 20 })
  tipo: string;

  @Column("varchar", { length: 300 })
  descricao: string;

  @ManyToOne(() => Pasta, (pasta) => pasta.arquivos)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Usuario, (usuario) => usuario.arquivos)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;
}
