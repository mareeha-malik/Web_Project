import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..','uploads'),  
    //   serveRoot: '/uploads', 
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-sweet-sea-a16w6jvz.ap-southeast-1.aws.neon.tech',
      port: 5432, 
      username: 'MW-Sports_owner',
      password: 'oFXd1wu5cbla',
      database: 'MW-Sports',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true, 
      ssl: { rejectUnauthorized: false },
      logging: ['error', 'info'],
    }),
    TypeOrmModule.forFeature([]),
    ProductModule,
    CloudinaryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}