import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlFont extends BodyComponent<{}> {
  static componentName = 'mj-font';

  static allowedAttributes = {
    name: 'string',
    href: 'string',
  };

  componentDidMount() {
    this.context.addFont(this.getAttribute('name'), this.getAttribute('href'));
  }

  componentDidUpdate() {
    this.context.addFont(this.getAttribute('name'), this.getAttribute('href'));
  }

  render() {
    const href = this.getAttribute('href');
    return (
      <>
        <link href={href} rel="stylesheet" type="text/css" />
        <style type="text/css">{`@import url(${href});`}</style>
      </>
    );
  }
}
