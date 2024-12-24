import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module'; // User module for interacting with the database
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../roles/roles.guard'; // Import RolesGuard
import { APP_GUARD } from '@nestjs/core'; // Global Guard ke liye use karein
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule), // Circular dependency resolve
    JwtModule.register({
      secret: 'L@mb0rghini_2925', // JWT secret from .env or direct string
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    JwtAuthGuard,
    {
      provide: APP_GUARD, // Global Guard ke liye
      useClass: RolesGuard, // Use RolesGuard globally for all routes that need to check user roles
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
