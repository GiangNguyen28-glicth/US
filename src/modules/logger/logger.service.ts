import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  error(message: any, trace?: string, context?: string) {
    // TO DO
    super.error(message, trace, context);
  }

  warn(message: string) {
    // TO DO
    super.warn(message);
  }

  log(message: string) {
    // TO DO
    super.log(message);
  }

  debug(message: string) {
    // TO DO
    super.debug(message);
  }

  verbose(message: string) {
    // TO DO
    super.verbose(message);
  }
}
