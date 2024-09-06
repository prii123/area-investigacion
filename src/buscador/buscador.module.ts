import { Module } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { BuscadorController } from './buscador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscadorEntity } from './entities/buscador.entity';
import { LibraryService } from './buscador.lib';

@Module({
  imports:[TypeOrmModule.forFeature([BuscadorEntity])],
  controllers: [BuscadorController],
  providers: [BuscadorService, LibraryService],
})
export class BuscadorModule {}
