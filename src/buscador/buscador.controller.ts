import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { CreateBuscadorDto } from './dto/create-buscador.dto';
import { UpdateBuscadorDto } from './dto/update-buscador.dto';

@Controller('buscador')
export class BuscadorController {
  constructor(private readonly buscadorService: BuscadorService) {}

  @Post()
  create(@Body() createBuscadorDto: CreateBuscadorDto) {
    return this.buscadorService.create(createBuscadorDto);
  }

  @Get()
  findAll() {
    return this.buscadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buscadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuscadorDto: UpdateBuscadorDto) {
    return this.buscadorService.update(+id, updateBuscadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buscadorService.remove(+id);
  }
}
