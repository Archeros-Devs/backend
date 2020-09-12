import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Usuario from "./Usuario";

@Entity("endereco")
export default class Endereco {
  @PrimaryGeneratedColumn({ type: "int", })
  id_endereco: number;

  @Column("int")
  id_usuario: number;

  @Column("varchar", { length: 100 })
  cidade: string;

  @Column("varchar", { length: 2 })
  estado: string;

  @Column("tinyint")
  cep: number;

  @Column("varchar", { length: 150 })
  endereco: string;

  @Column("varchar", { length: 20 })
  numero: string;

  @Column("varchar", { length: 80 })
  bairro: string;

  @Column("varchar", { length: 50 })
  complemento: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.enderecos)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;
}
