

import { BodyComponent } from '@src/components/BodyComponent';
import { omit, reduce } from 'lodash';

export class MjmlHeadAttribute extends BodyComponent<{}> {
  static componentName = 'mj-attributes';

  setGlobalAttribute = () => {
    const children = this.props.data.children || [];
    children.forEach(item => {
      const { attributes, tagName } = item;
      if (tagName === 'mj-class') {
        this.context.add('classes', attributes.name, omit(attributes, ['name']));

        this.context.add(
          'classesDefault',
          attributes.name,
          reduce(
            children,
            (acc, { tagName, attributes }) => ({
              ...acc,
              [tagName]: attributes,
            }),
            {} as Record<string, any>,
          ),
        );
      } else {
        this.context.add('defaultAttributes', tagName, attributes);
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
