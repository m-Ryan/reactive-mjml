

import { BodyComponent } from '@src/components/BodyComponent';
import { omit } from 'lodash';

export class MjmlHeadAttribute extends BodyComponent<{}> {
  static componentName = 'mj-attributes';

  setGlobalAttribute = () => {
    const children = this.props.data.children || [];
    children.forEach(item => {
      const { attributes, tagName } = item;
      if (tagName === 'mj-class') {
        this.context.addClassAttributes(attributes.name, omit(attributes, ['name']));
      } else if (tagName === 'mj-all') {
        Object.keys(attributes).forEach(key => {
          this.context.addGlobalAttribute(key, attributes[key]);
        });
      } else {
        this.context.addBlockDefaultAttribute(tagName, attributes);
      }
    });
  };

  componentDidMount() {
    this.setGlobalAttribute();
  }

  componentDidUpdate() {
    this.setGlobalAttribute();
  }

  render() {
    return null;
  }
}
