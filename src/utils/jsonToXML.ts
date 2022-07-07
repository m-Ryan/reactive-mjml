interface JsonItem {
  tagName: string;
  attributes: Record<string, string>;
  children: Array<JsonItem>;
  content?: string;
}

export const jsonToXML = ({
  tagName,
  attributes,
  children,
  content,
}: JsonItem): string => {
  const subNode =
    children && children.length > 0 ? children.map(jsonToXML).join('\n') : content || '';

  const stringAttrs = Object.keys(attributes)
    .map(attr => `${attr}="${attributes[attr]}"`)
    .join(' ');

  return `<${tagName}${
    stringAttrs === '' ? '>' : ` ${stringAttrs}>`
  }${subNode}</${tagName}>`;
};
