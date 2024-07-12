import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuscadorModule } from './buscador/buscador.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'buscadores',
      entities: [User], // Agrega tus entidades aquí
      synchronize: true, // Establecer a false en producción
    }),
    TypeOrmModule.forFeature([User]),
    BuscadorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
