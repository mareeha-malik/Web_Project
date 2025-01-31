// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
// import { UserService } from '../user/user.service';
// import { JwtPayload } from './jwt-payload.interface';
// import { User } from '../user/user.entity';
// import { compare } from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   // Login method
//   async login(email: string, password: string) {
//     console.log("Received email:", email);
//     const user = await this.usersService.findOneByEmail(email);
    
//     if (!user) {
//         console.error("User not found for email:", email);
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         console.error("Invalid password for email:", email); 
//         throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
//     }

//     const payload: JwtPayload = { username: user.username, email: user.email, role: user.role, id: user.id };
//     const accessToken = this.jwtService.sign(payload);
//     console.log('Generated Token:', accessToken); // Log the generated token

//     return { token: accessToken };
//   }

//   // Signup method
//   async signup(username: string, email: string, password: string) {
//     const existingUser = await this.usersService.findOneByEmail(email);
//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User();
//     user.username = username;
//     user.email = email;
//     user.password = hashedPassword;
//     user.role = 'user'; 
//     await this.usersService.create(user);
//     return { message: 'User successfully created' };
//   }
// }
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = { username: user.username, email: user.email, role: user.role, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { token: accessToken, role:user.role }; 
  }

  async signup(username: string, email: string, password: string, role: string = 'user') {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;

    await this.usersService.create(user);
    return { message: 'User successfully created' };
  }
}
