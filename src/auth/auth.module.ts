import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUserJwtStrategy } from './strategies/auth-user-jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('USER_SECRET');
        const expiresIn = configService.get<string>('USER_EXPIRESIN');
        return {
          secret,
          signOptions: { expiresIn: expiresIn || '1d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUserJwtStrategy],
})
export class AuthModule {}
