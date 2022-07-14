import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productService: ProductService,
  ) {}
  async addItemToCart(
    req: Request,
    res: Response,
    input: CartInput,
  ): Promise<boolean> {
    let listProduct: LineItem[] = [];
    let cart;
    const product = await this.productService.getProductById(input.productId);
    const cookie = req.cookies.cartId;
    if (this.checkCookie(cookie)) {
      cart = await this.getCartById(cookie);
      listProduct = cart.listItem;
      await this.isValidQuantityProduct(input.quantity, product, listProduct);
      const productExisting = listProduct.filter(item => {
        if (item.product._id.toString() === input.productId) {
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
      await this.cartModel.findOneAndUpdate(
        { _id: cart._id },
        { listItem: listProduct },
      );
    } else {
      await this.isValidQuantityProduct(input.quantity, product, listProduct);
      listProduct.push({
        product: product,
        quantity: input.quantity,
        totalPrice: this.totalPriceOfItem(product, input.quantity),
      });
      cart = await this.cartModel.create({ listItem: listProduct });
    }
    res.cookie('cartId', cart._id, this.optionCookie(req));
    return true;
  }

  async getListProducInCart(request: Request): Promise<LineItem[]> {
    const listProduct = await this.getCartById(request.cookies.cartId);
    return listProduct.listItem ? listProduct.listItem : [];
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
        `Không thể chọn số lượng vượt quá số lượng sản phẩm còn lại . ${product.name} chỉ có ${product.quantity} sản phẩm`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const productOfCart = lineItem.filter(
      item => item.product._id.toString() === product._id.toString(),
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
    product: string[],
  ): Promise<boolean> {
    try {
      let cart = await this.getListProducInCart(req);
      cart = cart.filter(item => {
        if (!product.includes(item.product._id.toString())) {
          return item;
        }
      });
      await this.cartModel.findOneAndUpdate(
        { _id: req.cookies.cartId },
        { listItem: cart },
      );
      res.cookie('cartId', req.cookies.cartId, this.optionCookie(req));
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateItem(
    input: CartInput,
    req: Request,
    res: Response,
  ): Promise<boolean> {
    let cart = await this.getListProducInCart(req);
    const product = await this.productService.getProductById(input.productId);
    if (!this.checkProductInLineItem(input.productId, cart)) {
      return false;
    }
    if (input.quantity > product.quantity) {
      throw new HttpException(
        `Không thể chọn số lượng vượt quá số lượng sản phẩm còn lại . ${product.name} chỉ có ${product.quantity} sản phẩm`,
        HttpStatus.BAD_REQUEST,
      );
    }
    cart = cart.filter(element => {
      if (element.product._id.toString() == input.productId) {
        element.quantity = input.quantity;
        element.totalPrice = this.totalPriceOfItem(
          element.product,
          element.quantity,
        );
      }
      return element;
    });
    await this.cartModel.findOneAndUpdate(
      { _id: req.cookies.cartId },
      { listItem: cart },
    );
    res.cookie('cartId', req.cookies.cartId, this.optionCookie(req));
    return true;
  }

  async getCartById(cartId: string): Promise<Cart> {
    try {
      const cart = await this.cartModel.findOne({ _id: cartId });
      if (!cart) {
        throw new HttpException('Giỏ hàng không tồn tại', HttpStatus.NOT_FOUND);
      }
      return cart;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteCart(response: Response): Promise<void> {
    await this.cartModel.findOneAndDelete();
    response.clearCookie('cartId');
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
