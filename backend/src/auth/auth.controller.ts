// import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   // Login endpoint
//   @Post('login')
//   @HttpCode(HttpStatus.OK) 
//   async login(@Body() body: { email: string; password: string }) {
//     return this.authService.login(body.email, body.password);
//   }

//   // Signup endpoint
//   @Post('signup')
//   @HttpCode(HttpStatus.CREATED)
//   async signup(@Body() body: { username: string; email: string; role: string; password: string }) {
//     return this.authService.signup(body.username, body.email, body.password);
//   }

//   // Protected route using JWT
//   @UseGuards(JwtAuthGuard)
//   @Post('protected')
//   @HttpCode(HttpStatus.OK)
//   async protectedRoute() {
//     return { message: 'You have access to this protected route!' };
//   }
// }
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) { // Changed username to email
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: { username: string; email: string; password: string; role?: string }) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async protectedRoute() {
    return { message: 'You have access to this protected route!' };
  }
}
