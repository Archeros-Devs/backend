import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import Arquivos from "./Arquivos";
import Endereco from "./Endereco";
import Estudo from "./Estudo";
import Categoria from "./Categoria";
import Pasta from "./Pasta";
import Escolaridade from "./Escolaridade";
import Profissoes from "./Profissoes";
import UsuarioAvaliaPasta from "./UsuarioAvaliaPasta";
import UsuarioSeguePasta from "./UsuarioSeguePasta";
import Banimento from "./Banimentos";
@Entity("usuario")
export default class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  id_usuario: number;

  @Column("varchar", { name: "cpf", nullable: true, unique: true, length: 11 })
  cpf: string | null;

  @Column("varchar", { name: "nome", length: 150 })
  nome: string;

  @Column("enum", { name: "genero", nullable: true, enum: ["masculino", "feminino"] })
  genero: "masculino" | "feminino" | null;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { length: 15 })
  telefone: string;

  @Column("int", { name: "id_profissao", default: () => "'0'" })
  id_profissao: number;

  @Column("varchar", { name: "senha", length: 255, select: false })
  senha: string;

  @Column("varchar", { name: "url_img", nullable: true, length: 255 })
  url_img: string | null;

  @Column("int", { name: "id_escolaridade", default: () => "'0'" })
  id_escolaridade: number;

  @Column("int", {
    name: "tipo_usuario",
    comment: "0 = Normal, 1 = Admin, 2 = Super Admin",
    default: () => "'0'",
  })
  tipo_usuario: number;

  @Column("date", { nullable: true })
  banido_ate: Date | null

  @CreateDateColumn()
  criado_em: Date;

  @DeleteDateColumn()
  deletado_em: Date | null;

  @OneToMany(() => Arquivos, (arquivos) => arquivos.usuario)
  arquivos: Arquivos[];

  @OneToMany(() => Endereco, (endereco) => endereco.usuario)
  enderecos: Endereco[];

  @OneToMany(() => Estudo, (estudo) => estudo.usuario)
  estudos: Estudo[];

  @ManyToMany(() => Categoria, (categoria) => categoria.usuarios)
  categorias: Categoria[];

  @OneToMany(() => Pasta, (pasta) => pasta.usuario)
  pastas: Pasta[];

  @ManyToOne(() => Escolaridade, (escolaridade) => escolaridade.usuarios)
  @JoinColumn([{ name: "id_escolaridade", referencedColumnName: "id_escolaridade" }])
  escolaridade: Escolaridade;

  @ManyToOne(() => Profissoes, (profissoes) => profissoes.usuarios)
  @JoinColumn([{ name: "id_profissao", referencedColumnName: "id_profissao" }])
  profissao: Profissoes;

  @OneToMany(() => UsuarioAvaliaPasta, (usuarioAvaliaPasta) => usuarioAvaliaPasta.usuario)
  avaliacoes: UsuarioAvaliaPasta[];

  @OneToMany(() => UsuarioSeguePasta, (usuarioSeguePasta) => usuarioSeguePasta.usuario)
  seguindo: UsuarioSeguePasta[];
}
