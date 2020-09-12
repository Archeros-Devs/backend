import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./Usuario";

@Entity("profissoes")
export default class Profissoes {
  @PrimaryGeneratedColumn({ type: "int" })
  id_profissao: number;

  @Column("tinytext")
  nome: string;

  @OneToMany(() => Usuario, (usuario) => usuario.profissao)
  usuarios: Usuario[];
}
