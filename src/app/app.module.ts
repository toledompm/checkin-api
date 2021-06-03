import { Module } from '@nestjs/common';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { CheckinModule } from 'src/checkin/checkin.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const moduleImports = [UserModule, AuthModule, CheckinModule];

@Module({
  imports: [...moduleImports, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
