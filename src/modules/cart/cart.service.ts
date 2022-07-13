import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { CartInput } from './dto/cart.input';
import { LineItem } from './entities/cart.entities';

@Injectable()
export class CartService {
  constructor(private productService: ProductService) {}
  async addItemToCart(
    req: Request,
    res: Response,
    input: CartInput,
  ): Promise<boolean> {
    let listProduct: LineItem[] = [];
    const product = await this.productService.getProductById(input.productId);
    const cookie = req.cookies.listProduct;
    if (this.checkCookie(cookie)) {
      listProduct = cookie;
      await this.isValidQuantityProduct(input.quantity, product, listProduct);
      const productExisting = listProduct.filter(item => {
        if (item.product._id === input.productId) {
          item.quantity = item.quantity + input.quantity;
          item.totalPrice = this.totalPriceOfItem(item.product, item.quantity);
          return product;
        }
      });
      if (productExisting.length == 0) {
        listProduct.push({
          product: product,
          quantity: input.quantity,
          totalPrice: this.totalPriceOfItem(product, input.quantity),
        });
      }
    } else {
      await this.isValidQuantityProduct(input.quantity, product, listProduct);

      listProduct.push({
        product: product,
        quantity: input.quantity,
        totalPrice: this.totalPriceOfItem(product, input.quantity),
      });
    }
    res.cookie('listProduct', listProduct, this.optionCookie(req));
    return true;
  }

  async getListProductInCookie(request: Request): Promise<LineItem[]> {
    return request.cookies?.listProduct ? request.cookies.listProduct : [];
  }

  totalQuantity(req: Request): number {
    const listProduct: LineItem[] = req.cookies.listProduct;
    let totalQuantity: number = 0;
    listProduct.forEach(
      lineItem => (totalQuantity = totalQuantity + lineItem.quantity),
    );
    return totalQuantity;
  }

  totalPrice(req: Request): number {
    const listProduct: LineItem[] = req.cookies.listProduct;
    let totalPrice: number = 0;
    listProduct.forEach(
      lineItem => (totalPrice = lineItem.totalPrice + totalPrice),
    );
    return totalPrice;
  }

  async isValidQuantityProduct(
    quantityAddToCart: number,
    product: Product,
    lineItem: LineItem[],
  ): Promise<boolean> {
    if (quantityAddToCart > product.quantity) {
      throw new HttpException(
        'Không thể chọn số lượng vượt quá số lượng sản phẩm còn lại',
        HttpStatus.BAD_REQUEST,
      );
    }
    const productOfCart = lineItem.filter(
      item => item.product._id === product._id.toString(),
    );
    if (productOfCart.length === 0) {
      return true;
    }
    const quantityCart: number = productOfCart[0].quantity;
    const totalQuantity = quantityCart + quantityAddToCart;
    if (totalQuantity > product.quantity) {
      throw new HttpException(
        `Không thể thêm sản phẩm này với số lượng ${quantityAddToCart} vì trong giỏ hàng
       đã có sản phẩm này với số lượng ${quantityCart} . Bạn chỉ có thêm ${
          product.quantity - quantityCart
        } nữa`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
  async isValidCart(lineItem: LineItem[]): Promise<boolean> {
    for (const item of lineItem) {
      const product = await this.productService.getProductById(
        item.product._id.toString(),
      );
      if (product.quantity < item.quantity) {
        throw new HttpException(
          `Sản phẩm ${item.product.name} số lượng sản phẩm chỉ còn ${product.quantity} sản phẩm. Vui lòng giảm số lượng sản phẩm này trong giỏ hàng`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
  async deleteItem(
    req: Request,
    res: Response,
    productId: string,
  ): Promise<boolean> {
    const cookie = req.cookies.listProduct;
    if (this.checkProductInLineItem(productId, cookie)) {
      return false;
    }
    let listProduct: LineItem[] = [];
    if (this.checkCookie(cookie)) {
      listProduct = cookie.filter(element => element.product._id != productId);
    }
    res.cookie('listProduct', listProduct, this.optionCookie(req));
    return true;
  }
  async updateItem(
    input: CartInput,
    req: Request,
    res: Response,
  ): Promise<boolean> {
    let listProduct: LineItem[] = [];
    const cookie = req.cookies.listProduct;
    if (this.checkProductInLineItem(input.productId, cookie)) {
      return false;
    }
    if (this.checkCookie(cookie)) {
      listProduct = cookie.filter(element => {
        if (element.product._id == input.productId) {
          element.quantity = input.quantity;
        }
        return element;
      });
    }
    res.cookie('listProduct', listProduct, this.optionCookie(req));
    return true;
  }
  deleteCart(response: Response): void {
    response.clearCookie('listProduct');
  }
  totalPriceOfItem(product: Product, quantity: number): number {
    const totalPrice: number = parseInt(product.price.toString()) * quantity;
    return totalPrice;
  }
  checkCookie(cookie): boolean {
    if (cookie != undefined && cookie?.lenght != 0) {
      return true;
    }
    return false;
  }
  optionCookie(req: Request): object {
    return {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 90000000),
      secure: req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'none',
    };
  }
  checkProductInLineItem(productId: string, listProduct: LineItem[]): boolean {
    return listProduct.some(element => element.product._id !== productId);
  }
}
