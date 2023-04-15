import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Producto {
   @Prop({required: true})
   nombre: string;
   
   @Prop({required: true})
   precio: number;
}
export const ProductoSchema = SchemaFactory.createForClass(Producto);
