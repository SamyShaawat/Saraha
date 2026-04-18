import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SocialAuthVerifier } from './social-auth.verifier';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SocialAuthVerifier],
})
export class AuthModule {}
