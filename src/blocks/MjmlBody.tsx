import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlBody extends BodyComponent<{}> {
  static componentName = 'mj-body';
  static allowedAttributes = {
    width: 'unit(px)',
    'background-color': 'color',
  };

  static defaultAttributes = {
    width: '600px',
  };

  getStyles() {
    return {
      div: {
        'background-color': this.getAttribute('background-color'),
      },
    };
  }

  getContainerWidth() {
    return this.getAttribute('width');
  }

  render() {
    return (
      <>
        <style type="text/css">
          {`

          #outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0;
        }
      `}
        </style>
        <div
          {...this.htmlAttributes(
            {
              class: this.getAttribute('css-class'),
              style: 'div',
            },
            false,
          )}
        >
          {this.props.data.children?.map((item, index) => (
            <BlockRenderer
              key={index}
              data={item}
              parent={this.props.data}
              containerWidth={this.getContainerWidth()}
            />
          ))}
        </div>
      </>
    );
  }
}
