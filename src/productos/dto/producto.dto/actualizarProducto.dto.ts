import { PartialType } from '@nestjs/mapped-types';
import { ProductoDto } from './producto.dto';

export class ActualizarProductoDto extends PartialType(ProductoDto) {}