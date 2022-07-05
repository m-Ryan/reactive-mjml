import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlPreview extends BodyComponent<{}> {
  static componentName = 'mj-preview';

  static endingTag = true;

  componentDidMount() {
    this.context.setPreview(this.getContent());
  }

  componentDidUpdate() {
    this.context.setPreview(this.getContent());
  }

  render() {
    return <></>;
  }
}
