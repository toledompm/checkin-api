import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const defaults = {
  role: UserRole.MEMBER,
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'uuid' })
  @Generated('uuid')
  public uuid: string;

  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'role' })
  public role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, defaults, partial);
  }
}
