import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'terceros' })
export class BuscadorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nit: number;

    @Column()
    dv: number;

    @Column()
    razonSocial: string;

    @Column()
    nombre1: string;

    @Column()
    nombre2: string;

    @Column()
    apllido1: string;

    @Column()
    apellido2: string;

    @Column()
    status_rut: boolean;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;
}
