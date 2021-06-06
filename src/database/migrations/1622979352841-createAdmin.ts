import { User, UserRole } from 'src/user/domain/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdmin1622979352841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const admin = new User({
      email: adminEmail,
      role: UserRole.ADMIN,
    });
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    await queryRunner.manager.delete(User, { email: adminEmail });
  }
}
