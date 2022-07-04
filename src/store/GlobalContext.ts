import { isObject, set } from 'lodash';
import { makeAutoObservable } from 'mobx';

type StanderObject = Record<string, string>;

export class GlobalContext {
  data = {
    backgroundColor: '',

    globalAttributes: {} as StanderObject,
    blockAttributes: {} as Record<string, StanderObject>,
    classAttributes: {} as Record<string, StanderObject>,
    breakpoint: '480px',
    fonts: [],
    inlineStyle: [],
    headStyle: {} as StanderObject,
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

  addHeadStyle = (identifier: string, headStyle: string) => {
    this.data.headStyle[identifier] = headStyle;
  };
  addComponentHeadStyle = (headStyle: string) => {
    this.data.componentsHeadStyle.push(headStyle);
  };
  addGlobalAttribute = (name: string, val: any) => {
    this.data.globalAttributes[name] = val;
  };
  addBlockDefaultAttribute = (name: string, val: StanderObject) => {
    if (!this.data.blockAttributes[name]) {
      this.data.blockAttributes[name] = {};
    }
    Object.assign(this.data.blockAttributes[name], val);
  };
  addClassAttributes = (name: string, val: StanderObject) => {
    if (!this.data.classAttributes[name]) {
      this.data.classAttributes[name] = {};
    }
    Object.assign(this.data.classAttributes[name], val);
  };
  setBackgroundColor = (color: string) => {
    this.data.backgroundColor = color;
  };
  setBreakPoint = (breakpoint: string) => {
    this.data.breakpoint = breakpoint;
  };
}
