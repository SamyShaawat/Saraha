import { Module } from '@nestjs/common';
import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
