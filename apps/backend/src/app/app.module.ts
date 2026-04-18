import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessModule } from '@saraha/data-access';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [DataAccessModule, AuthModule, UserModule, MessageModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
