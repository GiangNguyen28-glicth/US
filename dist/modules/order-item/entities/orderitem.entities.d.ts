import { Order } from '../../order/entities/order.entities';
import { Product } from '../../product/entities/product.entities';
export declare class OrderItem {
    _id: string;
    product: Product;
    order: Order;
    quantity: number;
    totalPrice: number;
    createAt: Date;
    updateAt: Date;
}
