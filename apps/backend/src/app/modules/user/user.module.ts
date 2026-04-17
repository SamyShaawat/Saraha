import { Module } from '@nestjs/common';
import { UserController } from '@app/modules/user/user.controller';
import { UserService } from '@app/modules/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
