import { isObject } from 'lodash';
import { makeAutoObservable } from 'mobx';

type StanderObject = Record<string, string>;

export class GlobalContext {
  data = {
    backgroundColor: '',

    beforeDoctype: '',
    breakpoint: '480px',
    classes: {},
    classesDefault: {},
    defaultAttributes: {} as StanderObject,
    htmlAttributes: {} as StanderObject,
    fonts: [],
    inlineStyle: [],
    headStyle: {} as StanderObject,
    componentsHeadStyle: [] as string[],
    headRaw: [],
    mediaQueries: {} as StanderObject,
    preview: '',
    style: [],
    title: '',
  };
  constructor() {
    makeAutoObservable(this);
  }

  add = (attr: string, ...params: any[]) => {
    const data = this.data as any;
    if (Array.isArray(data[attr])) {
      data[attr].push(...params);
    } else if (Object.prototype.hasOwnProperty.call(data, attr)) {
      if (params.length > 1) {
        if (isObject(data[attr][params[0]])) {
          data[attr][params[0]] = {
            ...data[attr][params[0]],
            ...(params[1] as any),
          };
        } else {
          data[attr][params[0]] = params[1];
        }
      } else {
        data[attr] = params[0];
      }
    } else {
      throw Error(
        `An mj-head element add an unkown head attribute : ${attr} with params ${
          Array.isArray(params) ? params.join('') : params
        }`,
      );
    }
  };

  addMediaQuery = (
    className: string,
    { parsedWidth, unit }: { parsedWidth: string | number; unit: string },
  ) => {
    this.data.mediaQueries[
      className
    ] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`;
  };
  addHeadStyle = (identifier: string, headStyle: string) => {
    this.data.headStyle[identifier] = headStyle;
  };
  addComponentHeadStyle = (headStyle: string) => {
    this.data.componentsHeadStyle.push(headStyle);
  };
  setBackgroundColor = (color: string) => {
    this.data.backgroundColor = color;
  };
  setBreakPoint = (breakpoint: string) => {
    this.data.breakpoint = breakpoint;
  };
}
