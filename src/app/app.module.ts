import { Module } from '@nestjs/common';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { CheckinModule } from 'src/checkin/checkin.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, AuthModule, CheckinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
