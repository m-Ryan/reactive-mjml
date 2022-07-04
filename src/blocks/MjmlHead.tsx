

import { BlockRenderer } from '@src/components/BlockRenderer';
import { BodyComponent } from '@src/components/BodyComponent';
import { toJS } from 'mobx';

export class MjmlHead extends BodyComponent<{}> {
  static componentName = 'mj-head';
  render() {
    console.log(toJS(this.context.data));

    return <>
      {
        this.props.data.children?.map((item, index) => <BlockRenderer key={index} data={item} containerWidth={''} parent={this.props.data} />)
      }
    </>;
  }
}