import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuscadorDto {
    @ApiProperty()
    @IsNotEmpty()
    //@Length(1 - 50)
    readonly nit: number;
}
