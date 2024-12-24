import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const canActivate = super.canActivate(context); // Call JwtAuthGuard logic
    if (!canActivate) {
      return false; // If JWT is invalid, deny access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Request User in RolesGuard:', user);

    if (!user) {
      console.log('Access Denied: No user found');
      return false;
    }

    if (user.role !== 'admin') {
      console.log('Access Denied: Invalid Role');
      return false;
    }

    return true; // User is authenticated and has the correct role
  }
}
