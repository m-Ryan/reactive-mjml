import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlTitle extends BodyComponent<{}> {
  static componentName = 'mj-title';

  static endingTag = true;

  componentDidMount() {
    this.context.setTitle(this.getContent());
  }

  componentDidUpdate() {
    this.context.setTitle(this.getContent());
  }

  render() {
    return <></>;
  }
}
