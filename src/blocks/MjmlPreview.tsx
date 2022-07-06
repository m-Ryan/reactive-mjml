import { BodyComponent } from '@src/components/BodyComponent';
import { MjmlContext } from '@src/context/MjmlContext';

export class MjmlPreview extends BodyComponent<{}> {
  static componentName = 'mj-preview';

  static endingTag = true;

  render() {
    return <></>;
  }
}
