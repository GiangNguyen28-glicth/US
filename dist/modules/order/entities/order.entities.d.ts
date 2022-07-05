import { User } from '../../user/entities/user.entities';
export declare class Order {
    _id: string;
    user: User;
    username: string;
    phonenumber: string;
    address: string;
    totalQuantity: number;
    totalPrice: number;
    createAt: Date;
    updateAt: Date;
}
