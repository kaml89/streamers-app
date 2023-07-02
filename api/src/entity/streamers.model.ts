import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { validate, validateOrReject, IsEmail, IsDate } from 'class-validator';
// import { StreamingPlatform } from '../streamers/streamers.interface';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  streamingPlatform: string;

  @Column()
  votes: number;
}
