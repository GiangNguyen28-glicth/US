import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entities';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productService: ProductService,
  ) {}
  async addItemToCart(input: CartInput, user: User): Promise<boolean> {
    let listProduct: LineItem[] = [];
    let cart = await this.getCartByUserId(user);
    const product = await this.productService.getProductById(input.productId);
    if (cart.listItem.length > 0) {
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
      cart = await this.cartModel.findOneAndUpdate(
        { user: user._id.toString() },
        { listItem: listProduct },
      );
    }
    return true;
  }

  async getListProducInCart(user: User): Promise<LineItem[]> {
    const listProduct = await this.getCartByUserId(user);
    return listProduct.listItem ? listProduct.listItem : [];
  }

  totalQuantity(req: Request): number {
    const listProduct: LineItem[] = req.cookies.listProduct;
    let totalQuantity = 0;
    listProduct.forEach(
      lineItem => (totalQuantity = totalQuantity + lineItem.quantity),
    );
    return totalQuantity;
  }

  totalPrice(req: Request): number {
    const listProduct: LineItem[] = req.cookies.listProduct;
    let totalPrice = 0;
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
        `Kh??ng th??? ch???n s??? l?????ng v?????t qu?? s??? l?????ng s???n ph???m c??n l???i . ${product.name} ch??? c?? ${product.quantity} s???n ph???m`,
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
        `Kh??ng th??? th??m s???n ph???m n??y v???i s??? l?????ng ${quantityAddToCart} v?? trong gi??? h??ng
       ???? c?? s???n ph???m n??y v???i s??? l?????ng ${quantityCart} . B???n ch??? c?? th??m ${
          product.quantity - quantityCart
        } n???a`,
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
          `S???n ph???m ${item.product.name} s??? l?????ng s???n ph???m ch??? c??n ${product.quantity} s???n ph???m. Vui l??ng gi???m s??? l?????ng s???n ph???m n??y trong gi??? h??ng`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
  async deleteItem(product: string[], user: User): Promise<boolean> {
    try {
      let cart = await this.getListProducInCart(user);
      cart = cart.filter(item => {
        if (!product.includes(item.product._id.toString())) {
          return item;
        }
      });
      await this.cartModel.findOneAndUpdate(
        { user: user._id },
        { listItem: cart },
      );
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateItem(input: CartInput, user: User): Promise<boolean> {
    let cart = await this.getListProducInCart(user);
    const product = await this.productService.getProductById(input.productId);
    if (!this.checkProductInLineItem(input.productId, cart)) {
      return false;
    }
    if (input.quantity > product.quantity) {
      throw new HttpException(
        `Kh??ng th??? ch???n s??? l?????ng v?????t qu?? s??? l?????ng s???n ph???m c??n l???i . ${product.name} ch??? c?? ${product.quantity} s???n ph???m`,
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
      { user: user._id },
      { listItem: cart },
    );
    return true;
  }

  async getCartByUserId(user: User): Promise<Cart> {
    try {
      let cart = await this.cartModel.findOne({ user: user._id.toString() });
      if (!cart) {
        cart = await this.cartModel.create({ user: user, listItem: [] });
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
