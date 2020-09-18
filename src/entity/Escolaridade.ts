import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import Usuario from "./Usuario";

@Entity("escolaridade")
export default class Escolaridade extends BaseEntity {
  @Column("int", { primary: true })
  private id_escolaridade: number;
  getId() { return this.id_escolaridade }

  @Column("varchar", { length: 100 })
  escolaridade: string;

  @OneToMany(() => Usuario, (usuario) => usuario.escolaridade)
  usuarios: Usuario[];
}
