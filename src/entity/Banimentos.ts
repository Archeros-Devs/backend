import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Pasta  from "./Pasta";
import Usuario from "./Usuario";

@Entity("banimento")
export default class Banimento extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id_banimento: number;

  @Column("int")
  id_usuario: number;

  @Column("int")
  id_administrador: number;

  @Column("varchar", { length: 255 })
  motivo: string;

  @Column("int")
  dias: number;
  
  @CreateDateColumn()
  criado_em: Date;
}
