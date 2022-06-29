import { ReadStream } from 'fs-capacitor';
export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream(): ReadStream;
}
export declare class Upload {
    promise: Promise<FileUpload>;
    file: FileUpload;
}
