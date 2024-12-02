import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  
      serveRoot: '/uploads', 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-sweet-sea-a16w6jvz.ap-southeast-1.aws.neon.tech',
      port: 5432, 
      username: 'MW-Sports_owner',
      password: 'utZzHowX3y1i',
      database: 'MW-Sports',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true, // Set to true for auto-sync (use cautiously in production)
      ssl: { rejectUnauthorized: false }, // Add SSL settings if needed
      logging: ['error', 'info'],
    }),
    // TypeOrmModule.forFeature([]),
    ProductModule,
    UsersModule, // Register Product entity for DI
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
