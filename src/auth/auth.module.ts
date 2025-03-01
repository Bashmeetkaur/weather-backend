/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from '../auth/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PassportModule , UsersModule],
  controllers: [AuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
