import { makeAutoObservable } from 'mobx';

type StanderObject = Record<string, string>;

export class GlobalContext {
  data = {
    backgroundColor: '',
    title: '',
    preview: '', // This tag allows you to set the preview that will be displayed in the inbox of the recipient.
    globalAttributes: {} as StanderObject,
    blockAttributes: {} as Record<string, StanderObject>,
    classAttributes: {} as Record<string, StanderObject>,
    breakpoint: '480px',
    fonts: [] as Array<{ name: string; href: string }>,
    inlineStyle: [],
    headStyle: {} as StanderObject,
  };
  constructor() {
    makeAutoObservable(this);
  }

  addFont = (name: string, href: string) => {
    this.data.fonts.push({
      name,
      href,
    });
  };

  addHeadStyle = (identifier: string, headStyle: string) => {
    this.data.headStyle[identifier] = headStyle;
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

  setPreview = (content: string) => {
    this.data.preview = content;
  };

  setTitle = (title: string) => {
    this.data.title = title;
  };

  setBackgroundColor = (color: string) => {
    this.data.backgroundColor = color;
  };

  setBreakPoint = (breakpoint: string) => {
    this.data.breakpoint = breakpoint;
  };
}
