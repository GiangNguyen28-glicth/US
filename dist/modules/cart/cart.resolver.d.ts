import { User } from '../user/entities/user.entities';
import { CartService } from './cart.service';
import { CartInput } from './dto/cart.input';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
    getListItemCart(user: User): Promise<any>;
    addItemToCart(input: CartInput, user: User): Promise<boolean>;
    deleteItemCart(products: string[], user: User): Promise<boolean>;
    updateItemCart(input: CartInput, user: User): Promise<boolean>;
}
