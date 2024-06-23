import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn() //decorator that tells TypeORM that this is the primary key auto-increment column
  id: number;
  //@PrimaryColumn() //decorator that tells TypeORM that this is the primary key column

  @Column() //decorator that tells TypeORM that this is a column
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;
}
