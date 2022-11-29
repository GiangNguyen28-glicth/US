import { PaginationInput } from '../../common/dto/common.dto';
import { LoggerService } from '../../logger/logger.service';
import { UserEmbeddedService } from '../../user_embedded/user_embedded.service';
import { FilterGetAllUser, FilterStatisticUser } from '../dto/create-user.dto';
import { Address, User, UserResult } from '../entities/user.entities';
import { UserModelType } from '../schema/user.schema';
export declare class UserHelper {
    private userModel;
    private loggerService;
    private userEmbeddedService;
    constructor(userModel: UserModelType, loggerService: LoggerService, userEmbeddedService: UserEmbeddedService);
    buildQueryWithUser(user: User, filter: FilterGetAllUser): Promise<any>;
    setNewInfoAfterLogin(user: User, coordinates: number[]): Promise<boolean>;
    handleResponseAddress(location: any): Address;
    getCurrentAddress(user: User): Promise<Address>;
    confirmBlockUser(_id: string): Promise<boolean>;
    declineBlockUser(_id: string): Promise<boolean>;
    getAllReportedUser(pagination: PaginationInput): Promise<UserResult>;
    statisticUser(pagination: PaginationInput, filter: FilterStatisticUser): Promise<UserResult>;
    calUserPercent(): Promise<number>;
    uploadImage({ stream }: {
        stream: any;
    }): Promise<any>;
    removeUpload(imageUrl: string): Promise<boolean>;
    CloudinaryProvider: {
        provide: string;
        useFactory: () => any;
    };
}
