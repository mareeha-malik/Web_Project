import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.error('No token provided');
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: 'L@mb0rghini_2925' });
      console.log('Decoded Token:', decoded);

      if (!decoded || !decoded.id || !decoded.role) {
        console.error('Invalid token data: Missing id or role');
        return false;
      }

      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Token Verification Error:', error.message);
      return false;
    }
  }
  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      console.error('Authorization header missing');
      return null;
    }
    console.log('Authorization header:', authHeader); 
  
    const token = authHeader.split(' ')[1]; 
    console.log('Extracted Token:', token);
    return token || null;
  }
  
}