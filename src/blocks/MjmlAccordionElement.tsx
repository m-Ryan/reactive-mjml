

import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { find } from 'lodash';

export class MjmlAccordionElement extends BodyComponent<{}> {
  static componentName = 'mj-accordion-element';

  static allowedAttributes = {
    'background-color': 'color',
    border: 'string',
    'font-family': 'string',
    'icon-align': 'enum(top,middle,bottom)',
    'icon-width': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-wrapped-url': 'string',
    'icon-wrapped-alt': 'string',
    'icon-unwrapped-url': 'string',
    'icon-unwrapped-alt': 'string',
    'icon-position': 'enum(left,right)',
  };

  static defaultAttributes = {
    title: {
      img: {
        width: '32px',
        height: '32px',
      },
    },
  };

  getStyles() {
    return {
      td: {
        padding: '0px',
        'background-color': this.getAttribute('background-color'),
      },
      label: {
        'font-size': '13px',
        'font-family': this.getAttribute('font-family'),
      },
      input: {
        display: 'none',
      },
    };
  }

  handleMissingChildren() {
    const { children } = this.props.data;
    const childrenAttr = [
      'border',
      'icon-align',
      'icon-width',
      'icon-height',
      'icon-position',
      'icon-wrapped-url',
      'icon-wrapped-alt',
      'icon-unwrapped-url',
      'icon-unwrapped-alt',
    ].reduce(
      (res, val) => ({
        ...res,
        [val]: this.getAttribute(val),
      }),
      {},
    );

    const result = [];

    if (!find(children, { tagName: 'mj-accordion-title' })) {
      result.push(
        <BlockRenderer key="!mj-accordion-title" data={{ tagName: 'mj-accordion-title', attributes: {} }} attributes={childrenAttr} parent={this.props.data} containerWidth={this.props.containerWidth} />

      );
    }

    result.push(...(this.props.data.children?.map((item, index) => {
      return (
        <BlockRenderer key={index} data={item} attributes={childrenAttr} parent={this.props.data} containerWidth={this.props.containerWidth} />
      );
    }) || []));

    if (!find(children, { tagName: 'mj-accordion-text' })) {
      result.push(
        <BlockRenderer key="!mj-accordion-text" data={{ tagName: 'mj-accordion-text', attributes: {} }} attributes={childrenAttr} parent={this.props.data} containerWidth={this.props.containerWidth} />
      );
    }

    return result;
  }

  render() {
    return (
      <tr
        {...this.htmlAttributes(
          {
            class: this.getAttribute('css-class'),
          },
          false,
        )}
      >
        <td {...this.htmlAttributes({ style: 'td' }, false)}>
          <label
            {...this.htmlAttributes(
              {
                class: 'mj-accordion-element',
                style: 'label',
              },
              false,
            )}
          >
            <input
              {...this.htmlAttributes(
                {
                  class: 'mj-accordion-checkbox',
                  type: 'checkbox',
                  style: 'input',
                },
                false,
              )}
            />
            <div>{this.handleMissingChildren()}</div>
          </label>
        </td>
      </tr>
    );
  }
}