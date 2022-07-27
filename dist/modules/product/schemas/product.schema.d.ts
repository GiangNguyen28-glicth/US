import { Document, Model, Schema } from 'mongoose';
import { Product } from '../entities/product.entities';
import { IProduct } from '../interfaces/product';
export declare type ProductDocument = Product & Document;
export declare type ProductModelType = Model<IProduct>;
export declare const ProductSchema: Schema<Product, Model<Product, any, any, any, any>, {}, {}, any, {}, "type", Product>;
