import { ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';
export declare class GraphQLExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
