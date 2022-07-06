import { IBlock } from '@src/typings';

export function xmlToJson(xml: string) {
  const domParser = new window.DOMParser();
  const doc = domParser.parseFromString(xml, 'text/html');
  return [...doc.body.children].map(loopBlock);
}

const contentBlock = [
  'mj-style',
  'mj-preview',
  'mj-title',
  'mj-text',
  'mj-button',
  'mj-table',
  'mj-navbar-link',
  'mj-raw',
  'mj-social-element',
  'mj-accordion-title>',
  'mj-accordion-text',
];

function loopBlock(ele: Element, index: number): IBlock {
  const tagName = ele.tagName.toLowerCase();
  const attributes = ele.getAttributeNames().reduce((o, key) => {
    o[key] = ele.getAttribute(key) || '';
    return o;
  }, {} as Record<string, string>);

  const isContentBlock = contentBlock.includes(tagName);

  let output: IBlock = {
    attributes,
    tagName,
  };

  if (isContentBlock) {
    output.content = ele.innerHTML;
  } else {
    output.children = [...ele.children].map(loopBlock);
  }
  return output;
}
