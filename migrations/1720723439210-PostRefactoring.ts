import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1720723439210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE terceros (
        //     id INT AUTO_INCREMENT PRIMARY KEY,
        //     nit INT NOT NULL,
        //     dv INT NOT NULL,
        //     razonSocial VARCHAR(255) NOT NULL,
        //     nombre1 VARCHAR(255) NOT NULL,
        //     nombre2 VARCHAR(255),
        //     apllido1 VARCHAR(255) NOT NULL,
        //     apellido2 VARCHAR(255),
        //     status_rut BOOLEAN NOT NULL,
        //     create_at DATETIME NOT NULL,
        //     update_at DATETIME NOT NULL
        //   );
          
        // ALTER TABLE terceros ADD CONSTRAINT unique_nit UNIQUE (nit);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
