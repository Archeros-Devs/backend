import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cidade")
export default class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cidade: number;

  @Column('varchar', { length: 100 })
  cidade: string;

  @Column('varchar', { length: 255 })
  cidade_sem_acento: string;

  @Column('varchar', { length: 50 })
  estado: string;

  @Column('varchar', { length: 255 })
  cidade_ibge: string;

  @Column('varchar', { length: 10 })
  ddd: string;

  @Column('varchar', { length: 20 })
  cidade_area: string;

  @Column('varchar', { length: 255 })
  latitude: string;

  @Column('varchar', { length: 255 })
  longitude: string;

  @Column('datetime')
  criado_em: Date;

  @Column('timestamp', { nullable: true })
  atualizado_em: Date | null;

  @Column('timestamp', { nullable: true })
  desativado_em: Date | null;
}
