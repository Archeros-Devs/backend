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
import cpfUtils from "../utils/cpfUtils";
import { capitalize } from "src/utils/string";
import argon2 from "argon2";

@Entity("usuario")
export default class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  private id_usuario: number;
  getId() {
    return this.id_usuario
  }

  @Column("varchar", { name: "cpf", nullable: true, unique: true, length: 11 })
  private cpf: string | null;
  getCpf() {
    return cpfUtils.format(this.cpf)
  }
  setCpf(cpf: string) {
    this.cpf = cpfUtils.strip(cpf)
    return this
  }

  @Column("varchar", { name: "nome", length: 150 })
  private nome: string;
  getNome() {
    return this.nome
  }
  setNome(nome: string) {
    this.nome = capitalize(nome, true)
    return this
  }

  @Column("enum", { name: "genero", nullable: true, enum: ["masculino", "feminino"] })
  private genero: "masculino" | "feminino" | null;
  getGenero() {
    return this.genero
  }
  setGenero(genero: "masculino" | "feminino" | null) {
    this.genero = genero
    return this
  }

  @Column("varchar", { name: "email", length: 255 })
  private email: string;
  getEmail() {
    return this.email
  }
  setEmail(email: string) {
    this.email = email.toLowerCase()
    return this
  }

  @Column("varchar", { length: 15 })
  private telefone: string;
  getTelefone() {
    return this.telefone
  }
  setTelefone(telefone: string) {
    this.telefone = telefone.replace(/\D/g, '')
    return this
  }

  @Column("int", { name: "id_profissao", default: () => "'0'" })
  private id_profissao: number;
  getProfissao() {
    return Profissoes.findOne(this.id_profissao)
  }
  setProfissao(profissao: Profissoes) {
    this.id_profissao = profissao.getId()
    return this
  }

  @Column("varchar", { name: "senha", length: 255, select: false })
  private senha: string;
  getSenha() {
    return this.senha
  }
  async setSenha(senha: string): Promise<this> {
    this.senha = await argon2.hash(senha);
    return this
  }

  @Column("varchar", { name: "url_img", nullable: true, length: 255 })
  private url_img: string | null;
  getUrlImagem() {
    return this.url_img
  }
  setUrlImagem(url: string) {
    this.url_img = url
    return this
  }

  @Column("int", { name: "id_escolaridade", default: () => "'0'" })
  private id_escolaridade: number;
  getEscolaridade() {
    return Escolaridade.findOne(this.id_escolaridade)
  }
  setEscolaridade(escolaridade: Escolaridade) {
    this.id_escolaridade = escolaridade.getId()
    return this
  }

  @Column("int", {
    name: "tipo_usuario",
    comment: "0 = Normal, 1 = Admin, 2 = Super Admin",
    default: () => "'0'",
  })
  private tipo_usuario: number;
  getTipo() {
    return this.tipo_usuario
  }
  setTipo() {
    this.tipo_usuario = 0
    return this
  }

  @CreateDateColumn()
  private criado_em: Date;

  @DeleteDateColumn()
  private deletado_em: Date | null;

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

  public save(): Promise<this> {

    return super.save()
  }
}
