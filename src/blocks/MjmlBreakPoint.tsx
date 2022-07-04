

import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlBreakPoint extends BodyComponent<{}> {
  static componentName = 'mj-breakpoint';

  static endingTag = true;

  static allowedAttributes = {
    width: 'unit(px)',
  };

  componentDidMount() {
    this.context.setBreakPoint(this.getAttribute('width'));
  }

  render() {
    return <></>;
  }
}