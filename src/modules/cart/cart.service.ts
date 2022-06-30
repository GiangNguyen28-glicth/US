import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(private productService: ProductService) {}
  async addItemToCart(req, res, productId: string): Promise<Product[]> {
    let listProduct: Product[] = [];
    const product = await this.productService.getProductById(productId);
    const cookie = req.cookies;
    console.log(req);
    // if (cookie != undefined && cookie?.length != 0) {
    //   listProduct = cookie;
    //   const productExisting = listProduct.filter(product => {
    //     if (product._id === productId) {
    //       console.log('Running Here');
    //       product.quantity = product.quantity + 1;
    //       return product;
    //     }
    //   });
    //   if (productExisting.length == 0) {
    //     listProduct.push(product);
    //   }
    // } else {
    //   listProduct.push(product);
    // }
    res.cookie('testCookie', 'Hello', {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'none',
    });
    return listProduct;
  }
}
