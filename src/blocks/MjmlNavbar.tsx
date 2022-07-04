

import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { ColumnChildWrapper } from '@src/components/ColumnChildWrapper';

export class MjmlNavbar extends BodyComponent<{}> {
  static componentName = 'mj-navbar';

  static allowedAttributes = {
    align: 'enum(left,center,right)',
    'base-url': 'string',
    hamburger: 'string',
    'ico-align': 'enum(left,center,right)',
    'ico-open': 'string',
    'ico-close': 'string',
    'ico-color': 'color',
    'ico-font-size': 'unit(px,%)',
    'ico-font-family': 'string',
    'ico-text-transform': 'string',
    'ico-padding': 'unit(px,%){1,4}',
    'ico-padding-left': 'unit(px,%)',
    'ico-padding-top': 'unit(px,%)',
    'ico-padding-right': 'unit(px,%)',
    'ico-padding-bottom': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'padding-left': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'ico-text-decoration': 'string',
    'ico-line-height': 'unit(px,%,)',
  };

  static defaultAttributes = {
    align: 'center',
    'base-url': null,
    hamburger: null,
    'ico-align': 'center',
    'ico-open': '&#9776;',
    'ico-close': '&#8855;',
    'ico-color': '#000000',
    'ico-font-size': '30px',
    'ico-font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
    'ico-text-transform': 'uppercase',
    'ico-padding': '10px',
    'ico-text-decoration': 'none',
    'ico-line-height': '30px',
  };

  navbarId = (+new Date()).toString();

  getNavbarStyle = () => {
    const breakpoint = this.getBreakpoint();
    return `
    noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }

    @media only screen and (max-width:${breakpoint}) {
      .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
      .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
      .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
      .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
      .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
      .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
    }
  `;
  };


  getStyles() {
    return {
      div: {
        align: this.getAttribute('align'),
        width: '100%',
      },
      label: {
        display: 'block',
        cursor: 'pointer',
        'mso-hide': 'all',
        'user-select': 'none',
        color: this.getAttribute('ico-color'),
        'font-size': this.getAttribute('ico-font-size'),
        'font-family': this.getAttribute('ico-font-family'),
        'text-transform': this.getAttribute('ico-text-transform'),
        'text-decoration': this.getAttribute('ico-text-decoration'),
        'line-height': this.getAttribute('ico-line-height'),
        'padding-top': this.getAttribute('ico-padding-top'),
        'padding-right': this.getAttribute('ico-padding-right'),
        'padding-bottom': this.getAttribute('ico-padding-bottom'),
        'padding-left': this.getAttribute('ico-padding-left'),
        padding: this.getAttribute('ico-padding'),
      },
      trigger: {
        display: 'none',
        'max-height': '0px',
        'max-width': '0px',
        'font-size': '0px',
        overflow: 'hidden',
      },
      icoOpen: {
        'mso-hide': 'all',
      },
      icoClose: {
        display: 'none',
        'mso-hide': 'all',
      },
    };
  }

  renderHamburger() {

    return (
      <div
        {...this.htmlAttributes(
          {
            class: 'mj-menu-trigger',
            style: 'trigger',
          },
          false,
        )}
      >
        <label
          {...this.htmlAttributes(
            {
              htmlFor: this.navbarId,
              class: 'mj-menu-label',
              style: 'label',
              align: this.getAttribute('ico-align'),
            },
            false,
          )}
        >
          <span
            {...this.htmlAttributes(
              {
                class: 'mj-menu-icon-open',
                style: 'icoOpen',
              },
              false,
            )}
          >
            {this.getAttribute('ico-open')}
          </span>
          <span
            {...this.htmlAttributes(
              {
                class: 'mj-menu-icon-close',
                style: 'icoClose',
              },
              false,
            )}
          >
            {this.getAttribute('ico-close')}
          </span>
        </label>
      </div>
    );
  }

  render() {
    return (
      <>
        <ColumnChildWrapper com={this}>

          {this.getAttribute('hamburger') === 'hamburger'
            ? this.renderHamburger()
            : null}
          <div
            {...this.htmlAttributes(
              {
                class: 'mj-inline-links',
                style: this.htmlAttributes('div'),
              } as any,
              false,
            )}
          >
            {this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} containerWidth={this.props.containerWidth} parent={this.props.data} attributes={{
              navbarBaseUrl: this.getAttribute('base-url'),
            }} />)}

            <style>{this.getNavbarStyle()}</style>
          </div>
        </ColumnChildWrapper>
      </>
    );
  }
}