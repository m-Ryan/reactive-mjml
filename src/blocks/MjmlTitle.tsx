import { BodyComponent } from '@src/components/BodyComponent';
import { MjmlContext } from '@src/context/MjmlContext';

export class MjmlTitle extends BodyComponent<{}> {
  static componentName = 'mj-title';

  static endingTag = true;
  declare context: React.ContextType<typeof MjmlContext>;
  static contextType = MjmlContext;

  componentDidMount() {
    this.props.context.setTitle(this.getContent());
  }

  componentDidUpdate() {
    this.props.context.setTitle(this.getContent());
  }

  render() {
    return <></>;
  }
}
