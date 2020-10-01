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
import Estudo from "./Estudo";
import Usuario from "./Usuario";
import Categoria from "./Categoria";
import UsuarioAvaliaPasta from "./UsuarioAvaliaPasta";
import UsuarioSeguePasta from "./UsuarioSeguePasta";
import UsuarioRepository from "@repository/UsuarioRepository";

const PERCENTUAL_HOMOLOGAR = 50
@Entity("pasta")
export default class Pasta extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", })
  id_pasta: number;

  @Column("int")
  id_usuario: number;

  @Column("varchar", { length: 150 })
  nome: string;

  @Column("varchar", { length: 300 })
  descricao: string;

  @Column("varchar", { length: 255 })
  discussao: string;

  @Column("varchar", { length: 300 })
  localizacao: string;

  @Column("timestamp", { nullable: true })
  private homologada_em: Date | null
  getDataHomologacao = () => this.homologada_em

  @CreateDateColumn()
  criado_em: Date;

  @DeleteDateColumn()
  deletado_em: Date | null;

  @OneToMany(() => Arquivos, (arquivos) => arquivos.pasta)
  arquivos: Arquivos[];

  @OneToMany(() => Estudo, (estudo) => estudo.pasta)
  estudos: Estudo[];

  @ManyToOne(() => Usuario, (usuario) => usuario.pastas)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  usuario: Usuario;

  @ManyToMany(() => Categoria, (categoria) => categoria.pastas)
  categorias: Categoria[];

  @OneToMany(() => UsuarioAvaliaPasta, (usuarioAvaliaPasta) => usuarioAvaliaPasta.pasta)
  avaliacoes: UsuarioAvaliaPasta[];
  avaliacoesPositivar = () => this.avaliacoes.reduce((acc, current) => current.avaliacao > 0 ? acc + 1 : acc, 0)

  @OneToMany(() => UsuarioSeguePasta, (usuarioSeguePasta) => usuarioSeguePasta.pasta)
  seguidores: UsuarioSeguePasta[];

  avaliacao: number
  
  async verificarHomologacao() {
    const [_, total] = await UsuarioRepository.findAllAdmins()
    const votosPositivos = this.avaliacoesPositivar()
    const percentualAprovado = votosPositivos / total * 100
    const pasta = await Pasta.findOneOrFail(this.id_pasta)
    if (percentualAprovado > PERCENTUAL_HOMOLOGAR) {
      pasta.homologada_em = new Date()
      return await pasta.save()
    }
    return false
  }
}
