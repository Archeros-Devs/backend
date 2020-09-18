import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./Usuario";

@Entity("profissoes")
export default class Profissoes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  private id_profissao: number;
  getId(){
    return this.id_profissao
  }

  @Column("tinytext")
  nome: string;

  @OneToMany(() => Usuario, (usuario) => usuario.profissao)
  usuarios: Usuario[];
}
