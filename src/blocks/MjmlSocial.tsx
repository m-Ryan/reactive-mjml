

import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { ColumnChildWrapper } from '@src/components/ColumnChildWrapper';
import { IComponentAttributes } from '@src/typings';

export class MjmlSocial extends BodyComponent<{}> {
  static componentName = 'mj-social';

  static allowedAttributes = {
    align: 'enum(left,right,center)',
    'border-radius': 'unit(px,%)',
    'container-background-color': 'color',
    color: 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'icon-size': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-padding': 'unit(px,%){1,4}',
    'inner-padding': 'unit(px,%){1,4}',
    'line-height': 'unit(px,%,)',
    mode: 'enum(horizontal,vertical)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'table-layout': 'enum(auto,fixed)',
    'text-padding': 'unit(px,%){1,4}',
    'text-decoration': 'string',
    'vertical-align': 'enum(top,bottom,middle)',
  };

  static defaultAttributes = {
    align: 'center',
    'border-radius': '3px',
    color: '#333333',
    'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
    'font-size': '13px',
    'icon-size': '20px',
    'inner-padding': null,
    'line-height': '22px',
    mode: 'horizontal',
    padding: '10px 25px',
    'text-decoration': 'none',
  };

  // eslint-disable-next-line class-methods-use-this
  getStyles() {
    return {
      tableVertical: {
        margin: '0px',
      },
    };
  }

  getSocialElementAttributes() {
    const base: IComponentAttributes = {};
    if (this.getAttribute('inner-padding')) {
      base.padding = this.getAttribute('inner-padding');
    }

    return [
      'border-radius',
      'color',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'icon-size',
      'icon-height',
      'icon-padding',
      'text-padding',
      'line-height',
      'text-decoration',
    ].reduce((res, attr) => {
      res[attr] = this.getAttribute(attr);
      return res;
    }, base);
  }

  renderHorizontal() {

    return this.props.data.children?.map((item, index) => {
      const content = <BlockRenderer key={index} data={item} containerWidth={this.props.containerWidth} parent={this.props.data} attributes={this.getSocialElementAttributes()} align={this.getAttribute('align')} mode={this.props.data.attributes.mode} />;
      return content;
    });

  }

  renderVertical() {
    return (
      <table
        {...this.htmlAttributes({
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: 'tableVertical',
        }, false)}
      >
        <tbody>
          {this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} containerWidth={this.props.containerWidth} parent={this.props.data} attributes={this.getSocialElementAttributes()} />)}

        </tbody>
      </table>
    );
  }

  render() {
    return (
      <ColumnChildWrapper com={this}>
        {
          this.getAttribute('mode') === 'horizontal'
            ? this.renderHorizontal()
            : this.renderVertical()
        }
      </ColumnChildWrapper>
    );
  };


}