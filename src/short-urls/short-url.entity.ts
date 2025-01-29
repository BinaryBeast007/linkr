import { ClickMetadata } from 'src/click-metadata/click-metadata.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  urlId: number;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: false,
  })
  originalUrl: string;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: false,
    unique: true,
  })
  shortenedUrl: string;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
    unique: true,
  })
  customAlias?: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  expirationDate?: Date;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  clickCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.shortUrls)
  user: User;

  @OneToMany(() => ClickMetadata, (clickMetadata) => clickMetadata.shortUrl)
  clickMetadata: ClickMetadata[];
}
