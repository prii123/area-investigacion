import { Module } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { BuscadorController } from './buscador.controller';

@Module({
  controllers: [BuscadorController],
  providers: [BuscadorService],
})
export class BuscadorModule {}
