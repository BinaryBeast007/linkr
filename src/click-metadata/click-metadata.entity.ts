import { ShortUrl } from 'src/short-urls/short-url.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ClickMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  clickTimestamp: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress: string;

  @Column({ type: 'json', nullable: true })
  geolocation: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  deviceType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  browserName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  operatingSystem: string;

  @ManyToOne(() => ShortUrl, (shortUrl) => shortUrl.clickMetadata)
  shortUrl: ShortUrl;
}
