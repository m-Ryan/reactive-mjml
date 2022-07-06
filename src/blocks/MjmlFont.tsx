import { BodyComponent } from '@src/components/BodyComponent';

export class MjmlFont extends BodyComponent<{}> {
  static componentName = 'mj-font';

  static allowedAttributes = {
    name: 'string',
    href: 'string',
  };

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
