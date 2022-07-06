import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlHead extends BodyComponent<{}> {
  static componentName = 'mj-head';
  render() {
    return (
      <>
        {this.props.data.children?.map((item, index) => (
          <BlockRenderer
            key={index}
            data={item}
            containerWidth={''}
            parent={this.props.data}
          />
        ))}
      </>
    );
  }
}
