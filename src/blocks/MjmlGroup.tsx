import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { getMediaQuery } from '@src/utils/helpers/getMediaQuery';
import { widthParser } from '@src/utils/widthParser';

export class MjmlGroup extends BodyComponent<{}> {
  static componentName = 'mj-group';

  static allowedAttributes = {
    'background-color': 'color',
    direction: 'enum(ltr,rtl)',
    'vertical-align': 'enum(top,bottom,middle)',
    width: 'unit(px,%)',
  };

  static defaultAttributes = {
    direction: 'ltr',
  };

  getParentWidth() {
    const parentWidth = this.getContainerWidth();
    const { nonRawSiblings } = this.props;
    const paddingSize =
      this.getShorthandAttrValue('padding', 'left') +
      this.getShorthandAttrValue('padding', 'right');

    let containerWidth =
      this.getAttribute('width') || `${parseFloat(parentWidth) / nonRawSiblings}px`;

    const { unit, parsedWidth } = widthParser(containerWidth, {
      parseFloatToInt: false,
    });

    if (unit === '%') {
      containerWidth = `${(parseFloat(parentWidth) * parsedWidth) / 100 - paddingSize}px`;
    } else {
      containerWidth = `${parsedWidth - paddingSize}px`;
    }

    return containerWidth;
  }

  getStyles() {
    return {
      div: {
        'font-size': '0',
        'line-height': '0',
        'text-align': 'left',
        display: 'inline-block',
        width: '100%',
        direction: this.getAttribute('direction'),
        'vertical-align': this.getAttribute('vertical-align'),
        'background-color': this.getAttribute('background-color'),
      },
      tdOutlook: {
        'vertical-align': this.getAttribute('vertical-align'),
        width: this.getWidthAsPixel(),
      },
    };
  }

  getParsedWidth(toString?: boolean) {
    const { nonRawSiblings } = this.props;

    const width = this.getAttribute('width') || `${100 / nonRawSiblings}%`;

    const { unit, parsedWidth } = widthParser(width, {
      parseFloatToInt: false,
    });

    if (toString) {
      return `${parsedWidth}${unit}`;
    }

    return {
      unit,
      parsedWidth,
    };
  }

  getWidthAsPixel() {
    const { containerWidth } = this.props;

    const { unit, parsedWidth } = widthParser(this.getParsedWidth(true) as any, {
      parseFloatToInt: false,
    });

    if (unit === '%') {
      return `${(parseFloat(containerWidth) * parsedWidth) / 100}px`;
    }
    return `${parsedWidth}px`;
  }

  getColumnClassAndMediaQuery() {
    let className = '';

    const { parsedWidth, unit } = this.getParsedWidth() as {
      unit: string;
      parsedWidth: number;
    };
    const formattedClassNb = parsedWidth.toString().replace('.', '-');

    switch (unit) {
      case '%':
        className = `mj-column-per-${formattedClassNb}`;
        break;

      case 'px':
      default:
        className = `mj-column-px-${formattedClassNb}`;
        break;
    }

    return {
      className,
      mediaQuery: getMediaQuery(
        className,
        {
          parsedWidth,
          unit,
        },
        this.props.context.breakpoint,
      ),
    };
  }

  render() {
    const { className: columnClassName, mediaQuery } = this.getColumnClassAndMediaQuery();
    let classesName = `${columnClassName} mj-outlook-group-fix`;

    if (this.getAttribute('css-class')) {
      classesName += ` ${this.getAttribute('css-class')}`;
    }

    return (
      <div
        {...this.htmlAttributes(
          {
            class: classesName,
            style: 'div',
          },
          false,
        )}
      >
        {this.props.data.children?.map((item, index) => (
          <BlockRenderer
            key={index}
            data={item}
            containerWidth={this.getParentWidth()}
            parent={this.props.data}
            attributes={{ mobileWidth: 'mobileWidth' }}
          />
        ))}
        {mediaQuery}
      </div>
    );
  }
}
