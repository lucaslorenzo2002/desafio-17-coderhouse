import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto/producto.dto';
import { ProductosService } from './productos.service';
import { Producto } from './schema/productos.schema';
import { ActualizarProductoDto } from './dto/producto.dto/actualizarProducto.dto';
import { Response } from 'express';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productoService: ProductosService) { }
    @Get()
    async getProductos(@Res() res: Response) {
        try {
            const productos = await this.productoService.getProductos();
            return res.render('inicioAdmin', {productos})
        } catch (error) {
            console.log(error)
        }
    }
    @Get('/crearproducto')
    async getCrearProducto(@Res() res: Response){
        try {
            return res.render('crearProducto')
        } catch (error) {
            console.log(error)
        }
    }
    @Post('/crearproducto')
    async crearProducto(@Res() res: Response, @Body() productoDto: ProductoDto){
        try{
            await this.productoService.crearProducto(productoDto);
            return res.redirect('/productos');
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Producto no creado!',
            error: 'Bad Request'
        });
        }
    } 
    @Get('/actualizarproducto/:id')
    async getActualizarProducto(@Res() res: Response, @Param('id') id: string){
        try {
            const producto = await this.productoService.getProducto(id);
            return res.render('actualizarProducto', {producto})
        } catch (error) {
            console.log(error)
        }
    }
    @Post('/actualizarproducto/:id')
    async actualizarProducto(@Res() res: Response, @Param('id') id: string, @Body() actualizarProductoDto: ActualizarProductoDto){
        try {
            await this.productoService.actualizarProducto(id, actualizarProductoDto)
            return res.redirect('/productos');
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Producto no actualizado!',
                error: 'Bad Request'
            });
        }
    }
    @Post('/:id')
    async eliminarProducto(@Res() res: Response, @Param('id') id: string){
        try {
            await this.productoService.eliminarProducto(id);
            return res.redirect('/productos');
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Producto no eliminado!',
                error: 'Bad Request'
            });
        }
    }
}
