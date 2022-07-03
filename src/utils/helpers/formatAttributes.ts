import { IComponentAttributes } from '@src/typings';
import { reduce } from 'lodash';
import { initializeType } from '../types/type';

export const formatAttributes = (
  attributes: IComponentAttributes,
  allowedAttributes: any,
) =>
  reduce(
    attributes,
    (acc, val, attrName) => {
      if (allowedAttributes && allowedAttributes[attrName]) {
        const TypeConstructor = initializeType(allowedAttributes[attrName]);

        if (TypeConstructor) {
          const type = new TypeConstructor(val);

          return {
            ...acc,
            [attrName]: type.getValue(),
          };
        }
      }

      return {
        ...acc,
        [attrName]: val,
      };
    },
    {},
  );
