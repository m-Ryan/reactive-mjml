

import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlRaw extends BodyComponent<{}> {
  static componentName = 'mj-raw';

  static endingTag = true;

  static rawElement = true;

  static allowedAttributes = {
    position: 'enum(file-start)',
  };

  render() {
    // FIXME
    return <span dangerouslySetInnerHTML={{ __html: this.getContent() }} />;


  }
}