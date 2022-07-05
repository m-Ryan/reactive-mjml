import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlStyle extends BodyComponent<{}> {
  static componentName = 'mj-style';

  static endingTag = true;

  static allowedAttributes = {
    inline: 'string',
  };

  componentDidMount() {
    this.context.addHeadStyle(
      this.getAttribute('inline') === 'inline' ? 'inlineStyle' : 'style',
      this.getContent(),
    );
  }

  componentDidUpdate() {
    this.context.addHeadStyle(
      this.getAttribute('inline') === 'inline' ? 'inlineStyle' : 'style',
      this.getContent(),
    );
  }

  render() {
    return <></>;
  }
}
