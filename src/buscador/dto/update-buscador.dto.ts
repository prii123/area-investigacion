import { PartialType } from '@nestjs/mapped-types';
import { CreateBuscadorDto } from './create-buscador.dto';

export class UpdateBuscadorDto extends PartialType(CreateBuscadorDto) {}
