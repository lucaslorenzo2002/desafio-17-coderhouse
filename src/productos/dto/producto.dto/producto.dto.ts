import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductoDto {

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    precio: number;
}