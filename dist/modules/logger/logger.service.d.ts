import { ConsoleLogger } from '@nestjs/common';
export declare class LoggerService extends ConsoleLogger {
    error(message: any, trace?: string, context?: string): void;
    warn(message: string): void;
    log(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
