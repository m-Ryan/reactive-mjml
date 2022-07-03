import { get } from 'lodash';

export function shorthandParser(cssValue: string, direction: 'top' | 'bottom' | 'left' | 'right') {
  const splintedCssValue = cssValue.split(' ');
  let directions = {} as { top: number, bottom: number, left: number, right: number; };

  switch (splintedCssValue.length) {
    case 2:
      directions = { top: 0, bottom: 0, left: 1, right: 1 };
      break;

    case 3:
      directions = { top: 0, left: 1, right: 1, bottom: 2 };
      break;

    case 4:
      directions = { top: 0, right: 1, bottom: 2, left: 3 };
      break;
    case 1:
    default:
      return parseInt(cssValue, 10);
  }

  return parseInt(splintedCssValue[directions[direction]].toString(), 10);
}

export function borderParser(border: string) {
  return parseInt(get(border.match(/(?:(?:^| )(\d+))/)!, 1), 10) || 0;
}
