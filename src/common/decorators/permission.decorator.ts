import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../constants/enum';

export const NeedPermission = (...permissions: Permission[]) =>
  SetMetadata('permission', permissions);
