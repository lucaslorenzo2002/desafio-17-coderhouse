import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';
import { Producto, ProductoSchema } from './productos/schema/productos.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Producto.name, schema: ProductoSchema}]),
  MongooseModule.forRoot('mongodb+srv://lucaslorenzo0303:Marruecos02@cluster0.2mhgyws.mongodb.net/?retryWrites=true&w=majority',{dbName: 'ecommerce'}), 
  ProductosModule],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService],
})
export class AppModule {}
