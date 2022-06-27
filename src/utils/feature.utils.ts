import { HttpException, HttpStatus } from '@nestjs/common';
import { transformTextSearch } from './string.utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getFieldsInFilter(filter: Object): Object {
  const fields = {};
  for (const key in filter) {
    if (!isUndefinedOrNull) {
      if (Array.isArray(filter[key])) {
        fields[key] = { $in: filter[key] };
      } else {
        fields[key] = filter[key];
      }
    }
  }
  return fields;
}
export function isUndefinedOrNull(val: any): boolean {
  return val === undefined || val === null;
}
export function toKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}
export function getQueryGetAll(prop: string, searchInput: string) {
  const query: any = {
    $and: [
      {
        property: {
          $regex: `${transformTextSearch(searchInput)}`,
          $options: 'i',
        },
      },
    ],
  };
  Object.defineProperty(
    query.$and[0],
    prop,
    Object.getOwnPropertyDescriptor(query.$and[0], 'property'),
  );

  delete query.$and[0]['property'];
  // if (!isEmptyObject(fields)) {
  //   query.$and.push(fields);
  // }
  return query;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmptyObject(obj: Object): boolean {
  for (const key in obj) {
    return false;
  }
  return true;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function setInputForOldDocument(input: Object, oldDoc: Object): void {
  if (!oldDoc) {
    throw new HttpException('Không tìm thấy Document', HttpStatus.NOT_FOUND);
  }

  for (const key in input) {
    if (!isUndefinedOrNull(input[key])) {
      oldDoc[key] = input[key];
    }
  }
}
