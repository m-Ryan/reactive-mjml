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
