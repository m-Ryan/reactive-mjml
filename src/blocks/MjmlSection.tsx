
import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { filter, flow, identity } from 'lodash';

const makeBackgroundString = flow(filter, identity, (str: string[]) => str.join(' '));

export class MjmlSection extends BodyComponent<{}> {
  static componentName = 'mj-section';

  static allowedAttributes = {
    'background-color': 'color',
    'background-url': 'string',
    'background-repeat': 'enum(repeat,no-repeat)',
    'background-size': 'string',
    'background-position': 'string',
    'background-position-x': 'string',
    'background-position-y': 'string',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'string',
    'border-right': 'string',
    'border-top': 'string',
    direction: 'enum(ltr,rtl)',
    'full-width': 'enum(full-width,false,)',
    padding: 'unit(px,%){1,4}',
    'padding-top': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'text-align': 'enum(left,center,right)',
    'text-padding': 'unit(px,%){1,4}',
  };

  static defaultAttributes = {
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'background-position': 'top center',
    direction: 'ltr',
    padding: '20px 0',
    'text-align': 'center',
    'text-padding': '4px 4px 4px 0',
  };


  getStyles() {
    const containerWidth = this.getContainerWidth();

    const fullWidth = this.isFullWidth();

    const background = this.getAttribute('background-url')
      ? {
        background: this.getBackground(),
        // background size, repeat and position has to be seperate since yahoo does not support shorthand background css property
        'background-position': this.getBackgroundString(),
        'background-repeat': this.getAttribute('background-repeat'),
        'background-size': this.getAttribute('background-size'),
      }
      : {
        background: this.getAttribute('background-color'),
        'background-color': this.getAttribute('background-color'),
      };

    return {
      tableFullwidth: {
        ...(fullWidth ? background : {}),
        width: '100%',
        'border-radius': this.getAttribute('border-radius'),
      },
      table: {
        ...(fullWidth ? {} : background),
        width: '100%',
        'border-radius': this.getAttribute('border-radius'),
      },
      td: {
        border: this.getAttribute('border'),
        'border-bottom': this.getAttribute('border-bottom'),
        'border-left': this.getAttribute('border-left'),
        'border-right': this.getAttribute('border-right'),
        'border-top': this.getAttribute('border-top'),
        direction: this.getAttribute('direction'),
        'font-size': '0px',
        padding: this.getAttribute('padding'),
        'padding-bottom': this.getAttribute('padding-bottom'),
        'padding-left': this.getAttribute('padding-left'),
        'padding-right': this.getAttribute('padding-right'),
        'padding-top': this.getAttribute('padding-top'),
        'text-align': this.getAttribute('text-align'),
      },
      div: {
        ...(fullWidth ? {} : background),
        margin: '0px auto',
        'border-radius': this.getAttribute('border-radius'),
        'max-width': containerWidth,
      },
      innerDiv: {
        'line-height': '0',
        'font-size': '0',
      },
    };
  }

  getBackground() {
    return makeBackgroundString([
      this.getAttribute('background-color'),
      ...(this.hasBackground()
        ? [
          `url('${this.getAttribute('background-url')}')`,
          this.getBackgroundString(),
          `/ ${this.getAttribute('background-size')}`,
          this.getAttribute('background-repeat'),
        ]
        : []),
    ]);
  }

  getBackgroundString() {
    const { posX, posY } = this.getBackgroundPosition();
    return `${posX} ${posY}`;
  }

  getBackgroundPosition() {
    const { x, y } = this.parseBackgroundPosition();

    return {
      posX: this.getAttribute('background-position-x') || x,
      posY: this.getAttribute('background-position-y') || y,
    };
  }

  parseBackgroundPosition() {
    const posSplit = this.getAttribute('background-position').split(' ');

    if (posSplit.length === 1) {
      const val = posSplit[0];
      // here we must determine if x or y was provided ; other will be center
      if (['top', 'bottom'].includes(val)) {
        return {
          x: 'center',
          y: val,
        };
      }

      return {
        x: val,
        y: 'center',
      };
    }

    if (posSplit.length === 2) {
      // x and y can be put in any order in background-position so we need to determine that based on values
      const val1 = posSplit[0];
      const val2 = posSplit[1];

      if (
        ['top', 'bottom'].includes(val1) ||
        (val1 === 'center' && ['left', 'right'].includes(val2))
      ) {
        return {
          x: val2,
          y: val1,
        };
      }

      return {
        x: val1,
        y: val2,
      };
    }

    // more than 2 values is not supported, let's treat as default value
    return { x: 'center', y: 'top' };
  }

  hasBackground() {
    return this.getAttribute('background-url') != null;
  }

  isFullWidth() {
    return this.getAttribute('full-width') === 'full-width';
  }

  renderSection() {
    const { box } = this.getBoxWidths();

    const containerWidth = `${box}px`;
    const hasBackground = this.hasBackground();
    const content = (
      <table
        {...this.htmlAttributes(
          {
            align: 'center',
            background: this.isFullWidth()
              ? ''
              : this.getAttribute('background-url'),
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: 'table',
          },
          false,
        )}
      >
        <tbody>
          <tr>
            <td
              {...this.htmlAttributes(
                {
                  style: 'td',
                },
                false,
              )}
            >
              {this.props.data.children?.map((item, index) => <BlockRenderer key={index} parent={this.props.data} data={item} containerWidth={containerWidth} />)}
            </td>
          </tr>
        </tbody>
      </table>
    );

    return (
      <div
        {...this.htmlAttributes(
          {
            class: this.isFullWidth() ? '' : this.getAttribute('css-class'),
            style: 'div',
          },
          false,
        )}
      >
        {hasBackground ? (
          <div {...this.htmlAttributes({ style: 'innerDiv' }, false)}>
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    );
  }

  renderFullWidth() {
    return (
      <table
        {...this.htmlAttributes(
          {
            align: 'center',
            class: this.getAttribute('css-class'),
            background: this.getAttribute('background-url'),
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: 'tableFullwidth',
          },
          false,
        )}
      >
        <tbody>
          <tr>
            <td>{this.renderSection()}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderSimple() {
    const section = this.renderSection();

    return <div>{section}</div>;
  }

  render() {

    return this.isFullWidth() ? this.renderFullWidth() : this.renderSimple();
  }
}