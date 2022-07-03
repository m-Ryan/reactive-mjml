
import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { widthParser } from '@src/utils/widthParser';
import { filter, flow, identity } from 'lodash';

const makeBackgroundString = flow(filter, identity, (str: string[]) => str.join(' '));

export class MjmlHero extends BodyComponent<{}> {
  static componentName = 'mj-hero';

  static allowedAttributes = {
    mode: 'string',
    height: 'unit(px,%)',
    'background-url': 'string',
    'background-width': 'unit(px,%)',
    'background-height': 'unit(px,%)',
    'background-position': 'string',
    'border-radius': 'string',
    'container-background-color': 'color',
    'inner-background-color': 'color',
    'inner-padding': 'unit(px,%){1,4}',
    'inner-padding-top': 'unit(px,%)',
    'inner-padding-left': 'unit(px,%)',
    'inner-padding-right': 'unit(px,%)',
    'inner-padding-bottom': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'background-color': 'color',
    'vertical-align': 'enum(top,bottom,middle)',
  };

  static defaultAttributes = {
    mode: 'fixed-height',
    height: '0px',
    'background-url': '',
    'background-position': 'center center',
    padding: '0px',
    'padding-bottom': '',
    'padding-left': '',
    'padding-right': '',
    'padding-top': '',
    'background-color': '#ffffff',
    'vertical-align': 'top',
  };

  getParentContainerWidth() {
    // Refactor -- removePaddingFor(width, ['padding', 'inner-padding'])
    const { containerWidth } = this.props;
    const paddingSize =
      this.getShorthandAttrValue('padding', 'left') +
      this.getShorthandAttrValue('padding', 'right');

    let currentContainerWidth = `${parseFloat(containerWidth)}px`;

    const { unit, parsedWidth } = widthParser(currentContainerWidth, {
      parseFloatToInt: false,
    });

    if (unit === '%') {
      currentContainerWidth = `${(parseFloat(containerWidth) * parsedWidth) / 100 - paddingSize
        }px`;
    } else {
      currentContainerWidth = `${parsedWidth - paddingSize}px`;
    }

    return currentContainerWidth;
  }

  getStyles() {
    const { containerWidth } = this.props;
    const backgroundRatio = Math.round(
      (parseInt(this.getAttribute('background-height'), 10) /
        parseInt(this.getAttribute('background-width'), 10)) *
      100,
    );

    const width = this.getAttribute('background-width') || containerWidth;

    return {
      div: {
        margin: '0 auto',
        'max-width': containerWidth,
      },
      table: {
        width: '100%',
      },
      tr: {
        'vertical-align': 'top',
      },
      'td-fluid': {
        width: `0.01%`,
        'padding-bottom': `${backgroundRatio}%`,
        'mso-padding-bottom-alt': '0',
      },
      hero: {
        background: this.getBackground(),
        'background-position': this.getAttribute('background-position'),
        'background-repeat': 'no-repeat',
        'border-radius': this.getAttribute('border-radius'),
        padding: this.getAttribute('padding'),
        'padding-top': this.getAttribute('padding-top'),
        'padding-left': this.getAttribute('padding-left'),
        'padding-right': this.getAttribute('padding-right'),
        'padding-bottom': this.getAttribute('padding-bottom'),
        'vertical-align': this.getAttribute('vertical-align'),
      },
      'outlook-table': {
        width: containerWidth,
      },
      'outlook-td': {
        'line-height': 0,
        'font-size': 0,
        'mso-line-height-rule': 'exactly',
      },
      'outlook-inner-table': {
        width: containerWidth,
      },
      'outlook-image': {
        border: '0',
        height: this.getAttribute('background-height'),
        'mso-position-horizontal': 'center',
        position: 'absolute',
        top: 0,
        width,
        'z-index': '-3',
      },
      'outlook-inner-td': {
        'background-color': this.getAttribute('inner-background-color'),
        padding: this.getAttribute('inner-padding'),
        'padding-top': this.getAttribute('inner-padding-top'),
        'padding-left': this.getAttribute('inner-padding-left'),
        'padding-right': this.getAttribute('inner-padding-right'),
        'padding-bottom': this.getAttribute('inner-padding-bottom'),
      },
      'inner-table': {
        width: '100%',
        margin: '0px',
      },
      'inner-div': {
        'background-color': this.getAttribute('inner-background-color'),
        float: this.getAttribute('align'),
        margin: '0px auto',
        width: this.getAttribute('width'),
      },
    };
  }

  getBackground = () =>
    makeBackgroundString([
      this.getAttribute('background-color'),
      ...(this.getAttribute('background-url')
        ? [
          `url('${this.getAttribute('background-url')}')`,
          'no-repeat',
          `${this.getAttribute('background-position')} / cover`,
        ]
        : []),
    ]);

  renderContent() {

    return (
      <div
        {...this.htmlAttributes({
          align: this.getAttribute('align'),
          class: 'mj-hero-content',
          style: 'inner-div',
        }, false)}
      >
        <table
          {...this.htmlAttributes({
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: 'inner-table',
          }, false)}
        >
          <tbody>
            <tr>
              <td {...this.htmlAttributes({ style: 'inner-td' }, false)} >
                <table
                  {...this.htmlAttributes({
                    border: '0',
                    cellpadding: '0',
                    cellspacing: '0',
                    role: 'presentation',
                    style: 'inner-table',
                  }, false)}
                >
                  <tbody>
                    {this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} parent={this.props.data} containerWidth={this.getParentContainerWidth()} />)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderMode() {
    const commonAttributes = {
      background: this.getAttribute('background-url'),
      style: 'hero',
    };

    /* eslint-disable no-alert, no-case-declarations */
    switch (this.getAttribute('mode')) {
      case 'fluid-height':
        const magicTd = this.htmlAttributes({ style: `td-fluid` });

        return <>
          <td {...magicTd} />
          <td {...this.htmlAttributes({ ...commonAttributes }, false)}>
            {this.renderContent()}
          </td>
          <td {...magicTd} />
        </>;
      case 'fixed-height':
      default:
        const height =
          parseInt(this.getAttribute('height'), 10) -
          this.getShorthandAttrValue('padding', 'top') -
          this.getShorthandAttrValue('padding', 'bottom');

        return <td
          {...this.htmlAttributes({
            ...commonAttributes,
            height: height.toString(),
          }, false)}
        >
          {this.renderContent()}
        </td>;
    }
    /* eslint-enable no-alert, no-case-declarations */
  }

  render() {

    return (
      <div
        {...this.htmlAttributes({
          align: this.getAttribute('align'),
          class: this.getAttribute('css-class'),
          style: 'div',
        }, false)}
      >
        <table
          {...this.htmlAttributes({
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: 'table',
          }, false)}
        >
          <tbody>
            <tr
              {...this.htmlAttributes({
                style: 'tr',
              }, false)}

            >{this.renderMode()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}