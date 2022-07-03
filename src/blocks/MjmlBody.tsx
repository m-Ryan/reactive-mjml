import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { MjmlContext } from '@src/context/MjmlContext';

export class MjmlBody extends BodyComponent<{}> {
  static componentName = 'mj-body';
  static contextType = MjmlContext;
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

  changeGlobalData = () => {
    this.context.setBackgroundColor(this.getAttribute('background-color'));
  };

  getContainerWidth() {
    return this.getAttribute('width');
  }

  componentDidMount() {
    this.changeGlobalData();

  }

  componentDidUpdate() {
    this.changeGlobalData();
  }


  render() {

    return <div
      {...this.htmlAttributes(
        {
          class: this.getAttribute('css-class'),
          style: 'div',
        },
        false,
      )}
    >
      {this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} parent={this.props.data} containerWidth={this.getContainerWidth()} />)}
    </div>;
  }
}