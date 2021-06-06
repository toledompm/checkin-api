import { User } from 'src/user/domain/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'checkins' })
export class CheckIn {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (user) => user.checkins)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @CreateDateColumn({ name: 'timestamp' })
  public timestamp: Date;
}
