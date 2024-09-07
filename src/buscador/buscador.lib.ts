import { Injectable } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';

// @Injectable()
export class LibraryService {
    private valoresBuscados: number[];
    private DATA: any[] = [];
    private nombre_archivo: string;
    private url: string = "https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces";
    private archivo: string = process.cwd().split('buscador')[0];
    private driver: WebDriver | null = null;

    constructor(
      valoresBuscados: number[], nombre_archivo: string) {
        this.valoresBuscados = valoresBuscados;
        this.nombre_archivo = nombre_archivo;
    }

    async iniciar_navegador(): Promise<void> {
        const options = new chrome.Options();
        // options.addArguments("--headless"); // Habilitar el modo headless para que se oculte el navegador
        this.driver = await new Builder()
            .forBrowser('chrome')
            // .setChromeOptions(options)
            .build();
        await this.driver.get(this.url);
        await this.driver.sleep(2000); // Pausa de 2 segundos
    }

    async cerrar_navegador(): Promise<void> {
        if (this.driver) {
            await this.driver.quit();
        }
    }

    async unaBusqueda(valor: number): Promise<[any,any,any,any,any,any,any,any,]> {
        if (!this.driver) return;

        try {
            const inputElement = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"));
            await inputElement.clear();
            await inputElement.sendKeys(valor);

            const buttonElement = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:btnBuscar"));
            await buttonElement.click();

            await this.driver.sleep(3000); // Esperar algunos segundos para que la página se cargue después de hacer clic

            try {
                const pA = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerApellido")).getText();
                const sA = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:segundoApellido")).getText();
                const pN = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerNombre")).getText();
                const sN = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:otrosNombres")).getText();
                const eR = 1//await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:estado")).getText();
                const dV = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:dv")).getText();

                this.DATA.push([valor, dV, pA, sA, pN, sN, "", eR]);
                return [valor, dV, pA, sA, pN, sN, "", eR]
            } catch (e) {
                try {
                    const rZ = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:razonSocial")).getText();
                    const eRR = 1 //await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:estado")).getText();
                    const dvEm = await this.driver.findElement(By.id("vistaConsultaEstadoRUT:formConsultaEstadoRUT:dv")).getText();

                    this.DATA.push([valor, dvEm, "", "", "", "", rZ, eRR]);
                    return [valor, dvEm, "", "", "", "", rZ, eRR]
                } catch (e) {
                    this.DATA.push([valor, "", "", "", "", "", 0]);
                    return [valor, "", "", "", "", "", 0, ""]
                }
            }
        } catch (e) {
            console.error('Error en unaBusqueda:', e);
            this.DATA.push([valor, "", "", "", "", "", "Error"]);
            return [valor, "", "", "", "", "", "Error", ""]
        }
    }

    async multiples_busquedas(): Promise<void> {
        await this.iniciar_navegador();
        for (const nit_busqueda of this.valoresBuscados) {
            await this.unaBusqueda(nit_busqueda);
        }
        await this.cerrar_navegador();
    }

    archivo_excel(): string {
        const workbook = xlsx.utils.book_new();
        const hoja_activa = xlsx.utils.aoa_to_sheet([['NIT', 'DV', 'APELLIDO 1', 'APELLIDO 2', 'NOMBRE 1', 'NOMBRE 2', 'RAZON SOCIAL', 'ESTADO']]);
        xlsx.utils.sheet_add_aoa(hoja_activa, this.DATA, { origin: -1 });

        xlsx.utils.book_append_sheet(workbook, hoja_activa, 'Resultados');

        const carpeta_delos_archivos = path.join(this.archivo, 'archivos');
        const nombre_del_archivo_generado = this.nombre_archivo;
        const numero_aleatorio = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
        const ruta_archivo = path.join(carpeta_delos_archivos, `${nombre_del_archivo_generado}${numero_aleatorio}.xlsx`);

        if (!fs.existsSync(carpeta_delos_archivos)) {
            fs.mkdirSync(carpeta_delos_archivos);
        }

        xlsx.writeFile(workbook, ruta_archivo);

        return `${nombre_del_archivo_generado}${numero_aleatorio}.xlsx`;
    }
}
