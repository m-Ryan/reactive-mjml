import { BodyComponent } from '@src/components/BodyComponent';
import { MjmlContext } from '@src/context/MjmlContext';

export class MjmlStyle extends BodyComponent<{}> {
  static componentName = 'mj-style';
  declare context: React.ContextType<typeof MjmlContext>;
  static contextType = MjmlContext;

  static endingTag = true;

  static allowedAttributes = {
    inline: 'string',
  };

  render() {
    return <></>;
  }
}
