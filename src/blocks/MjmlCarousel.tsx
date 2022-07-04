

import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { ColumnChildWrapper } from '@src/components/ColumnChildWrapper';
import { suffixCssClasses } from '@src/utils/helpers/suffixCssClasses';
import { widthParser } from '@src/utils/widthParser';
import { map, min, range, repeat } from 'lodash';

export class MjmlCarousel extends BodyComponent<{}> {
  static componentName = 'mj-carousel';

  static allowedAttributes = {
    align: 'enum(left,center,right)',
    'border-radius': 'unit(px,%)',
    'container-background-color': 'color',
    'icon-width': 'unit(px,%)',
    'left-icon': 'string',
    padding: 'unit(px,%){1,4}',
    'padding-top': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'right-icon': 'string',
    thumbnails: 'enum(visible,hidden)',
    'tb-border': 'string',
    'tb-border-radius': 'unit(px,%)',
    'tb-hover-border-color': 'color',
    'tb-selected-border-color': 'color',
    'tb-width': 'unit(px,%)',
  };

  static defaultAttributes = {
    align: 'center',
    'border-radius': '6px',
    'icon-width': '44px',
    'left-icon': 'https://i.imgur.com/xTh3hln.png',
    'right-icon': 'https://i.imgur.com/os7o9kz.png',
    thumbnails: 'visible',
    'tb-border': '2px solid transparent',
    'tb-border-radius': '6px',
    'tb-hover-border-color': '#fead0d',
    'tb-selected-border-color': '#ccc',
  };

  carouselId = (+new Date()).toString();



  getCarouselStyle = () => {
    const length = this.props.data.children?.length;
    const { carouselId } = this;

    if (!length) return '';

    const carouselCss = `
    .mj-carousel {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    .mj-carousel-${this.carouselId}-icons-cell {
      display: table-cell !important;
      width: ${this.getAttribute('icon-width')} !important;
    }

    .mj-carousel-radio,
    .mj-carousel-next,
    .mj-carousel-previous {
      display: none !important;
    }

    .mj-carousel-thumbnail,
    .mj-carousel-next,
    .mj-carousel-previous {
      touch-action: manipulation;
    }

    ${range(0, length)
        .map(
          (i) =>
            `.mj-carousel-${carouselId}-radio:checked ${repeat(
              '+ * ',
              i,
            )}+ .mj-carousel-content .mj-carousel-image`,
        )
        .join(',')} {
      display: none !important;
    }

    ${range(0, length)
        .map(
          (i) =>
            `.mj-carousel-${carouselId}-radio-${i + 1}:checked ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-content .mj-carousel-image-${i + 1}`,
        )
        .join(',')} {
      display: block !important;
    }

    .mj-carousel-previous-icons,
    .mj-carousel-next-icons,
    ${range(0, length).map(
          (i) =>
            `.mj-carousel-${carouselId}-radio-${i + 1}:checked ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-content .mj-carousel-next-${((i + (1 % length) + length) % length) + 1
            }`,
        )},
    ${range(0, length).map(
          (i) =>
            `.mj-carousel-${carouselId}-radio-${i + 1}:checked ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-content .mj-carousel-previous-${((i - (1 % length) + length) % length) + 1
            }`,
        )} {
      display: block !important;
    }

    ${range(0, length)
        .map(
          (i) =>
            `.mj-carousel-${carouselId}-radio-${i + 1}:checked ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-content .mj-carousel-${carouselId}-thumbnail-${i + 1
            }`,
        )
        .join(',')} {
      border-color: ${this.getAttribute('tb-selected-border-color')} !important;
    }

    .mj-carousel-image img + div,
    .mj-carousel-thumbnail img + div {
      display: none !important;
    }

    ${range(0, length)
        .map(
          (i) =>
            `.mj-carousel-${carouselId}-thumbnail:hover ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-main .mj-carousel-image`,
        )
        .join(',')} {
      display: none !important;
    }

    .mj-carousel-thumbnail:hover {
      border-color: ${this.getAttribute('tb-hover-border-color')} !important;
    }

    ${range(0, length)
        .map(
          (i) =>
            `.mj-carousel-${carouselId}-thumbnail-${i + 1}:hover ${repeat(
              '+ * ',
              length - i - 1,
            )}+ .mj-carousel-main .mj-carousel-image-${i + 1}`,
        )
        .join(',')} {
      display: block !important;
    }
    `;

    return `${carouselCss}`;
  };

  getStyles() {
    return {
      carousel: {
        div: {
          display: 'table',
          width: '100%',
          'table-layout': 'fixed',
          'text-align': 'center',
          'font-size': '0px',
        },
        table: {
          'caption-side': 'top',
          display: 'table-caption',
          'table-layout': 'fixed',
          width: '100%',
        },
      },
      images: {
        td: {
          padding: '0px',
        },
      },
      radio: {
        input: {
          display: 'none',
          'mso-hide': 'all',
        },
      },
      controls: {
        div: {
          display: 'none',
          'mso-hide': 'all',
        },
        img: {
          display: 'block',
          width: this.getAttribute('icon-width'),
          height: 'auto',
        },
        td: {
          'font-size': '0px',
          display: 'none',
          'mso-hide': 'all',
          padding: '0px',
        },
      },
      thumbnails: {
        a: {
          border: this.getAttribute('tb-border'),
          'border-radius': this.getAttribute('tb-border-radius'),
          display: 'inline-block',
          overflow: 'hidden',
          width: this.thumbnailsWidth(),
        },
        img: {
          display: 'block',
          width: '100%',
          height: 'auto',
        },
      }
    };
  }

  thumbnailsWidth() {
    if (!this.props.data.children?.length) return 0;
    return (
      this.getAttribute('tb-width') ||
      `${min([Number(this.props.containerWidth) / this.props.data.children.length, 110])}px`
    );
  }

  imagesAttributes() {
    return map(this.props.data.children, 'attributes');
  }

  generateRadios() {
    const carouselId = this.carouselId;
    return <>{this.props.data.children?.map((item, index) => (
      <input
        key={index}
        {...this.htmlAttributes({
          class: `mj-carousel-radio mj-carousel-${carouselId}-radio mj-carousel-${carouselId}-radio-${index + 1
            }`,
          defaultChecked: index === 0 ? 'checked' : '',
          type: 'radio',
          name: `mj-carousel-radio-${carouselId}`,
          id: `mj-carousel-${carouselId}-radio-${index + 1}`,
          style: 'radio.input',
        }, false)}
      />
    ))}</>;

  }

  generateThumbnails() {
    const carouselId = this.carouselId;

    if (this.getAttribute('thumbnails') !== 'visible') return <></>;
    return this.props.data.children?.map((item, index) => {
      const { src, alt, 'tb-width': width, target } = item.attributes;
      const cssClass = suffixCssClasses(
        this.getAttribute('css-class'),
        'thumbnail',
      );
      const imgIndex = index + 1;
      return (
        <a
          key={index}
          {...this.htmlAttributes({
            style: 'thumbnails.a',
            href: `#${imgIndex}`,
            target,
            class: `mj-carousel-thumbnail mj-carousel-${carouselId}-thumbnail mj-carousel-${carouselId}-thumbnail-${imgIndex} ${cssClass}`,
          }, false)}
        >
          <label {...this.htmlAttributes({
            htmlFor: `mj-carousel-${carouselId}-radio-${imgIndex}`,
          }, false)}>
            <img
              {...this.htmlAttributes({
                style: 'thumbnails.img',
                src: this.getAttribute('thumbnails-src') || src,
                alt,
                width: parseInt(width, 10).toString(),
              }, false)}
            />
          </label>
        </a>
      );
    });

  }

  generateControls(direction: string, icon: string) {
    const iconWidth = parseInt(this.getAttribute('icon-width'), 10);

    return <td
      {...this.htmlAttributes({
        class: `mj-carousel-${this.carouselId}-icons-cell`,
        style: 'controls.td',
      }, false)}
    >
      <div
        {...this.htmlAttributes({
          class: `mj-carousel-${direction}-icons`,
          style: 'controls.div',
        }, false)}
      >
        {range(1, (this.props.data.children?.length || 0) + 1)
          .map(
            (i) => <label
              key={i}
              {...this.htmlAttributes({
                htmlFor: `mj-carousel-${this.carouselId}-radio-${i}`,
                class: `mj-carousel-${direction} mj-carousel-${direction}-${i}`,
              }, false)}
            >
              <img
                {...this.htmlAttributes({
                  src: icon,
                  alt: direction,
                  style: 'controls.img',
                  width: iconWidth.toString(),
                }, false)}
              />
            </label>
          )}
      </div>
    </td>;
  }

  generateImages() {
    return <td
      {...this.htmlAttributes({
        style: 'images.td',
      }, false)}
    >
      <div
        {...this.htmlAttributes({
          class: 'mj-carousel-images',
        }, false)}
      >
        {this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} containerWidth={this.getContainerWidth()} attributes={{ 'border-radius': this.getAttribute('border-radius') }} parent={this.props.data} index={index} />)}

      </div>
    </td>;
  }

  generateCarousel() {
    return (
      <table
        {...this.htmlAttributes({
          style: 'carousel.table',
          border: '0',
          'cell-padding': '0',
          'cell-spacing': '0',
          width: '100%',
          role: 'presentation',
          class: 'mj-carousel-main',
        }, false)}
      >
        <tbody>
          <tr>
            {this.generateControls('previous', this.getAttribute('left-icon'))}
            {this.generateImages()}
            {this.generateControls('next', this.getAttribute('right-icon'))}
          </tr>
        </tbody>
      </table>
    );
  }



  render() {
    return (
      <ColumnChildWrapper com={this}>
        <div
          {...this.htmlAttributes({
            class: 'mj-carousel',
          }, false)}
        >
          {this.generateRadios()}
          <div
            {...this.htmlAttributes({
              class: `mj-carousel-content mj-carousel-${this.carouselId}-content`,
              style: 'carousel.div',
            }, false)}

          >
            {this.generateThumbnails()}
            {this.generateCarousel()}

          </div>
          <style>{this.getCarouselStyle()}</style>
        </div>
      </ColumnChildWrapper>

    );
  }
}