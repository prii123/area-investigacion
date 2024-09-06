import { Injectable } from '@nestjs/common';
import { CreateBuscadorDto } from './dto/create-buscador.dto';
import { UpdateBuscadorDto } from './dto/update-buscador.dto';
import { BuscadorEntity } from './entities/buscador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryService } from './buscador.lib';

@Injectable()
export class BuscadorService  {
constructor(
  @InjectRepository(BuscadorEntity) private buscadorTercero: Repository<BuscadorEntity>,
  private readonly lib: LibraryService
){}


  async findByNit(createBuscadorDto: CreateBuscadorDto) {
    console.log(createBuscadorDto)
    var i =  this.lib
    console.log(i.helloWorld())
    return `This action returns all buscador`;
  }


}
