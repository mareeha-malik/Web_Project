import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
      password: 'tSRqHW6vOLh4',
      database: 'MW-Sports',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true, 
      ssl: { rejectUnauthorized: false },
      logging: ['error', 'info'],
    }),
    TypeOrmModule.forFeature([]),
    ProductModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
