import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { FileService } from '../file/file.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './strategies';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    FileService,
  ],
})
export class AuthModule {}
