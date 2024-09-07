import { Injectable } from '@nestjs/common';
import { CreateBuscadorDto } from './dto/create-buscador.dto';
import { UpdateBuscadorDto } from './dto/update-buscador.dto';
import { BuscadorEntity } from './entities/buscador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryService } from './buscador.lib';

@Injectable()
export class BuscadorService {
  constructor(
    @InjectRepository(BuscadorEntity) private buscadorTercero: Repository<BuscadorEntity>
  ) { }


  async findByNit(createBuscadorDto: CreateBuscadorDto[]) {
    const valoresEnBaseDeDatos = [];
    const valoresBuscados = [];

    for (const i of createBuscadorDto) {
      let query = "SELECT * FROM terceros WHERE nit = " + i.nit + ""
      const valor = await this.buscadorTercero.query(query);
      if (valor.length > 0) {
        valoresEnBaseDeDatos.push(i.nit)
      } else {
        valoresBuscados.push(i.nit)
      }

    }


    console.log("a bsucar ", valoresBuscados)
    console.log("en base de datos", valoresEnBaseDeDatos)


    const nombre_archivo = 'resultados';
    const buscador = new LibraryService(valoresBuscados, nombre_archivo);
    // await buscador.multiples_busquedas();
    await buscador.iniciar_navegador()

    for (const i of valoresBuscados) {
        try {
          var busqueda = await buscador.unaBusqueda(i)
          console.log(busqueda)
          let query = "INSERT INTO terceros (nit, dv, razonSocial, nombre1, nombre2, apllido1, apellido2, status_rut) VALUES ("+busqueda[0]+",'"+busqueda[1]+"','"+busqueda[6]+"','"+busqueda[4]+"','"+busqueda[5]+"','"+busqueda[2]+"','"+busqueda[3]+"','"+busqueda[7]+"')"
        await this.buscadorTercero.query(query);
        } catch (error) {
          console.log("codigo existe")
        }

    }
    await buscador.cerrar_navegador()

    return `This action returns all buscador`;
  }


}
