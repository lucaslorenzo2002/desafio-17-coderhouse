import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto/producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './schema/productos.schema';
import { Model } from 'mongoose';
import { ActualizarProductoDto } from './dto/producto.dto/actualizarProducto.dto';

@Injectable()
export class ProductosService {
    constructor(@InjectModel(Producto.name) private productoModel: Model<Producto>) {}
    
    async getProductos() {
        try {
            const productos = await this.productoModel.find().lean().exec();
            return productos
        } catch (error) {
            console.log(error)
        }
    }
    async getProducto(id: string): Promise<Producto> {
        try {
            const producto = await this.productoModel.findById(id).lean();
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    async crearProducto(productoDTO: ProductoDto){
        try {
            await this.productoModel.create(productoDTO);            
        } catch (error) {
            console.log(error)
        }
    }
    async actualizarProducto(id: string, actualizarProductoDto: ActualizarProductoDto): Promise<Producto>{
        try {
            const productoActualizado = await this.productoModel.findByIdAndUpdate(id, actualizarProductoDto, { new: true });
            if (!productoActualizado) {
            throw new NotFoundException(`Producto #${id} not found`);
            }
            return productoActualizado;
        } catch (error) {
            console.log(error)
        }
    }
    async eliminarProducto(id: string): Promise<Producto>{
        try {
            const productoEliminado = await this.productoModel.findByIdAndDelete(id);
            return productoEliminado
        } catch (error) {
            console.log(error)
        }
    }
}
