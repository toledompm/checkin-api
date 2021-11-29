import { CheckIn } from 'src/checkin/domain/checkin.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  TOTEM = 'totem',
}

const defaults = {
  role: UserRole.MEMBER,
};

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'uuid' })
  @Generated('uuid')
  public uuid: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'first_name', nullable: true })
  public firstName: string;

  @Column({ name: 'last_name', nullable: true })
  public lastName: string;

  @Column({ name: 'role' })
  public role: UserRole;

  @OneToMany(() => CheckIn, (checkin) => checkin.user)
  public checkins: CheckIn;

  @OneToMany(() => CheckIn, (checkin) => checkin.totemId)
  public checkinsMade: CheckIn;

  constructor(partial: Partial<User>) {
    Object.assign(this, defaults, partial);
  }
}
