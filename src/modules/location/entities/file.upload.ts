import { ReadStream } from 'fs-capacitor';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
export class Upload {
  promise: Promise<FileUpload>;
  file: FileUpload;
}
