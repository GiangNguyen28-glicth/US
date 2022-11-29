import { NotFoundException } from '@nestjs/common';

export function throwIfNotExists<T>(
  model: T | any | undefined,
  message: string,
) {
  if (!model || model?.isDeleted) {
    throw new NotFoundException(`${message}`);
  }
}
