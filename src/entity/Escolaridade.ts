import { Column, Entity, OneToMany } from "typeorm";
import Usuario from "./Usuario";

@Entity("escolaridade")
export default class Escolaridade {
  @Column("int", { primary: true })
  id_escolaridade: number;

  @Column("varchar", { length: 100 })
  escolaridade: string;

  @OneToMany(() => Usuario, (usuario) => usuario.escolaridade)
  usuarios: Usuario[];
}
