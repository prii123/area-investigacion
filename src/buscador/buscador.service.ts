import { Injectable } from '@nestjs/common';
import { CreateBuscadorDto } from './dto/create-buscador.dto';
import { UpdateBuscadorDto } from './dto/update-buscador.dto';

@Injectable()
export class BuscadorService {
  create(createBuscadorDto: CreateBuscadorDto) {
    return 'This action adds a new buscador';
  }

  findAll() {
    return `This action returns all buscador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buscador`;
  }

  update(id: number, updateBuscadorDto: UpdateBuscadorDto) {
    return `This action updates a #${id} buscador`;
  }

  remove(id: number) {
    return `This action removes a #${id} buscador`;
  }
}
