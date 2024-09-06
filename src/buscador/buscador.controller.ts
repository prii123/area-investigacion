import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { CreateBuscadorDto } from './dto/create-buscador.dto';
import { UpdateBuscadorDto } from './dto/update-buscador.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('buscador')
export class BuscadorController {
  constructor(private readonly buscadorService: BuscadorService) {}

  @Post()
  create(@Body() createBuscadorDto: CreateBuscadorDto) {
    return this.buscadorService.findByNit(createBuscadorDto);
  }

 

  
}
