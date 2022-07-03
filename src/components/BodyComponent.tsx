import { borderParser, shorthandParser } from '@src/utils/helpers/shorthandParser';
import { identity, omitBy, reduce, isNil, isString, camelCase, get, } from 'lodash';
import { Component } from 'react';
import he from 'he';
import { IBlock, IComponentAttributes } from '@src/typings';
import { formatAttributes } from '@src/utils/helpers/formatAttributes';
import { MjmlContext } from '@src/context/MjmlContext';

export abstract class BodyComponent<T extends Record<string, string>> extends Component<{ data: IBlock<T>; nonRawSiblings: number; containerWidth: string; }, {}, typeof MjmlContext> {
  declare context: React.ContextType<typeof MjmlContext>;
  static defaultAttributes: Record<string, any> = {};
  static allowedAttributes: Record<string, string> = {};

  static contextType = MjmlContext;

  get attributes(): IComponentAttributes {
    return formatAttributes(
      {
        ...(this.constructor as any).defaultAttributes,
        // ...globalAttributes,
        // FIXME
        ...this.props.data.attributes,
      },
      (this.constructor as any).allowedAttributes,
    );

  };

  static rawElement?: boolean;

  static isRawElement() {
    return !!this.rawElement;
  }

  getAttribute(name: string): string {
    return (this.attributes as any)[name];
  }

  getContent() {
    return this.props.data.content?.trim() || '';
  }

  getStyles() {
    return {};
  }

  getShorthandAttrValue(attribute: string, direction: 'top' | 'bottom' | 'left' | 'right') {
    const mjAttributeDirection = this.getAttribute(`${attribute}-${direction}`);
    const mjAttribute = this.getAttribute(attribute);

    if (mjAttributeDirection) {
      return parseInt(mjAttributeDirection, 10);
    }

    if (!mjAttribute) {
      return 0;
    }

    return shorthandParser(mjAttribute, direction);
  }

  getShorthandBorderValue(direction: 'top' | 'bottom' | 'left' | 'right') {
    const borderDirection =
      direction && this.getAttribute(`border-${direction}`);
    const border = this.getAttribute('border');

    return borderParser(borderDirection || border || '0');
  }

  getContainerWidth() {
    return this.props.containerWidth;
  }

  getBoxWidths() {
    const containerWidth = this.getContainerWidth();
    const parsedWidth = parseInt(containerWidth, 10);

    const paddings =
      this.getShorthandAttrValue('padding', 'right') +
      this.getShorthandAttrValue('padding', 'left');

    const borders =
      this.getShorthandBorderValue('right') +
      this.getShorthandBorderValue('left');

    return {
      totalWidth: parsedWidth,
      borders,
      paddings,
      box: parsedWidth - paddings - borders,
    };
  }

  htmlAttributes(attributes: IComponentAttributes, raw = true) {
    const specialAttributes = {
      style: (v: string) => this.styles(v, raw),
      default: identity,
    };

    if (raw) {
      return reduce(
        omitBy(attributes, isNil),
        (output, v, name) => {
          const fn = name === 'style' ? specialAttributes.style : specialAttributes.default;
          const value = fn(
            v,
          );
          return `${output} ${name}="${isString(value) ? he.decode(value) : value
            }"`;
        },
        '',
      );
    } else {
      const obj = reduce(
        omitBy(attributes, isNil),
        (output, v, name) => {
          const fn = name === 'style' ? specialAttributes.style : specialAttributes.default;
          const value = fn(
            v,
          );

          let property: string = name;
          if (name === 'class') {
            property = 'className';
          }
          if (name.startsWith('cell')) {
            property = camelCase(name.replace(/^cell(.*)$/, 'cell_$1'));
          }

          property = camelCase(property);

          if (property === 'verticalAlign') {
            property = 'verticalalign';
          }
          return {
            ...output,
            [property]: isString(value) ? he.decode(value) : value,
          };
        },
        {},
      );
      return obj;
    }
  }

  styles(styles: string | Record<string, string>, raw = true) {
    let stylesObject;

    if (styles) {
      if (typeof styles === 'string') {
        stylesObject = get(this.getStyles(), styles);
      } else {
        stylesObject = styles;
      }
    }

    if (raw) {
      return reduce(
        stylesObject,
        (output, value, name) => {
          if (!isNil(value)) {
            return `${output}${name}:${isString(value) ? he.decode(value) : value
              };`;
          }
          return output;
        },
        '',
      );
    }

    const map: Record<string, string> = {};
    for (let i in stylesObject) {
      if (stylesObject[i]) {
        map[camelCase(i)] = isString(stylesObject[i])
          ? he.decode(stylesObject[i])
          : stylesObject[i];
      }
    }
    return map;
  }



}