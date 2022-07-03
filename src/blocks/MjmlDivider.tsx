

import { BodyComponent } from '@src/components/BodyComponent';
import { ColumnChildWrapper } from '@src/components/ColumnChildWrapper';
import { widthParser } from '@src/utils/widthParser';

export class MjmlDivider extends BodyComponent<{}> {
  static componentName = 'mj-divider';

  static allowedAttributes = {
    'border-color': 'color',
    'border-style': 'string',
    'border-width': 'unit(px)',
    'container-background-color': 'color',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    width: 'unit(px,%)',
    align: 'enum(left,center,right)',
  };

  static defaultAttributes = {
    'border-color': '#000000',
    'border-style': 'solid',
    'border-width': '4px',
    padding: '10px 25px',
    width: '100%',
    align: 'center',
  };

  getStyles() {
    let computeAlign = '0px auto';
    if (this.getAttribute('align') === 'left') {
      computeAlign = '0px';
    } else if (this.getAttribute('align') === 'right') {
      computeAlign = '0px 0px 0px auto';
    }
    const p = {
      'border-top': ['style', 'width', 'color']
        .map((attr) => this.getAttribute(`border-${attr}`))
        .join(' '),
      'font-size': '1px',
      margin: computeAlign,
      width: this.getAttribute('width'),
    };

    return {
      p,
      outlook: {
        ...p,
        width: this.getOutlookWidth(),
      },
    };
  }

  getOutlookWidth() {
    const { containerWidth } = this.props;
    const paddingSize =
      this.getShorthandAttrValue('padding', 'left') +
      this.getShorthandAttrValue('padding', 'right');

    const width = this.getAttribute('width');

    const { parsedWidth, unit } = widthParser(width);

    switch (unit) {
      case '%': {
        const effectiveWidth = parseInt(containerWidth, 10) - paddingSize;
        const percentMultiplier = parseInt(parsedWidth.toString(), 10) / 100;
        return `${effectiveWidth * percentMultiplier}px`;
      }
      case 'px':
        return width;
      default:
        return `${parseInt(containerWidth, 10) - paddingSize}px`;
    }
  }

  render() {
    return (
      <ColumnChildWrapper com={this}>
        <p
          {...this.htmlAttributes(
            {
              style: 'p',
            },
            false,
          )}
        ></p>
      </ColumnChildWrapper>

    );
  }
}