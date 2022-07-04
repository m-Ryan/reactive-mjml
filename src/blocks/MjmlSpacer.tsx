

import { BodyComponent } from '@src/components/BodyComponent';
import { ColumnChildWrapper } from '@src/components/ColumnChildWrapper';

export class MjmlSpacer extends BodyComponent<{}> {
  static componentName = 'mj-spacer';

  static allowedAttributes = {
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'container-background-color': 'color',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    height: 'unit(px,%)',
  };

  static defaultAttributes = {
    height: '20px',
  };

  getStyles() {
    return {
      div: {
        height: this.getAttribute('height'),
        'line-height': this.getAttribute('height'),
      },
    };
  }

  render() {
    return (
      <ColumnChildWrapper com={this}>
        <div
          {...this.htmlAttributes({
            style: 'div',
          }, false)}
        >
          &#8202;
        </div>
      </ColumnChildWrapper>

    );
  }
}