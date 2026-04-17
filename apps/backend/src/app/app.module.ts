import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessModule } from '@saraha/data-access';
import { AuthModule } from '@app/modules/auth/auth.module';
import { UserModule } from '@app/modules/user/user.module';

@Module({
  imports: [DataAccessModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
