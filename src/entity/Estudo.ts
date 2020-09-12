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

@Entity("estudo")
export default class Estudo {
  @PrimaryGeneratedColumn({ type: "int", })
  id_mensagem: number;

  @Column("int")
  id_usuario: number;

  @Column("int")
  id_pasta: number;

  @Column("tinyint", {
    comment: "1 = estudo; 2 = analise tecnica",
    default: () => "'1'",
  })
  tipo: number;

  @Column("varchar", { length: 255 })
  mensagem: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  criado_em: Date;

  @Column("timestamp", { nullable: true })
  deletado_em: Date | null;

  @ManyToOne(() => Pasta, (pasta) => pasta.estudos)
  @JoinColumn([{ name: "id_pasta", referencedColumnName: "id_pasta" }])
  pasta: Pasta;

  @ManyToOne(() => Usuario, (usuario) => usuario.estudos)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;
}
