import Upload from 'graphql-upload/Upload.js';
import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryResolver {
    private cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Upload): Promise<any>;
}
