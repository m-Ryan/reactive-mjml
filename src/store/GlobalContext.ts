import { IBlock } from '@src/typings';
import { find, flatMap, omit, set } from 'lodash';
import { makeAutoObservable } from 'mobx';

type StanderObject = Record<string, string>;

export class GlobalContext {
  mjmlData: IBlock;
  constructor(data: IBlock) {
    const mjBody = find(data.children, { tagName: 'mj-body' });

    if (!mjBody) {
      throw new Error('Invalid data');
    }
    this.mjmlData = data;
    makeAutoObservable(this);
  }

  get head() {
    const mjHead = find(this.mjmlData.children, { tagName: 'mj-head' });
    return mjHead;
  }

  get breakpoint() {
    const breakpoint = find(this.mjmlData.children, { tagName: 'mj-breakpoint' });
    return breakpoint?.attributes.width || '480px';
  }

  get fonts() {
    if (!this.head || !this.head.children) return [];
    const fonts = this.head.children
      .filter(item => item.tagName === 'mj-font')
      .map(item => ({
        name: item.attributes.name,
        href: item.attributes.href,
      }));
    return fonts;
  }

  get title() {
    if (!this.head || !this.head.children) return [];
    const item = this.head.children.find(item => item.tagName === 'mj-title');
    return item?.content || '';
  }

  get preview() {
    if (!this.head || !this.head.children) return [];
    const item = this.head.children.find(item => item.tagName === 'mj-preview');
    return item?.content || '';
  }

  get headStyle() {
    if (!this.head || !this.head.children) return [];
    const styles = this.head.children
      .filter(item => item.tagName === 'mj-style')
      .map(item => ({
        inline: item.attributes.inline,
        content: item.content || '',
      }));
    return styles;
  }

  get headAttributes() {
    if (!this.head || !this.head.children) return [];

    return flatMap(
      this.head.children
        .filter(item => item.tagName === 'mj-attributes')
        .map(item => item.children || []),
    );
  }

  get globalAttributes() {
    let mapData: StanderObject = {};
    this.headAttributes
      .filter(item => item.tagName === 'mj-all')
      .forEach(item => {
        Object.keys(item.attributes).forEach(key => {
          mapData[key] = item.attributes[key];
        });
      });
    return mapData;
  }

  get classAttributes() {
    let mapData: Record<string, any> = {};
    this.headAttributes
      .filter(item => item.tagName === 'mj-class')
      .forEach(item => {
        mapData[item.attributes.name] = omit(item.attributes, ['name']);
      });
    return mapData;
  }

  get blockAttributes() {
    let mapData: Record<string, any> = {};
    this.headAttributes
      .filter(item => item.tagName !== 'mj-class' && item.tagName !== 'mj-all')
      .forEach(item => {
        mapData[item.tagName] = item.attributes;
      });
    return mapData;
  }

  setPreview = (content: string) => {
    const item = this.head?.children?.find(item => item.tagName === 'mj-preview');
    if (item) {
      item.content = content;
    }
  };

  setTitle = (title: string) => {
    const item = this.head?.children?.find(item => item.tagName === 'mj-title');
    if (item) {
      item.content = title;
    }
  };

  setBackgroundColor = (color: string) => {
    const mjBody = find(this.mjmlData.children, { tagName: 'mj-body' });
    if (mjBody) {
      mjBody.attributes['background-color'] = color;
    }
  };

  setBreakPoint = (breakpoint: string) => {
    const breakpointBlock = find(this.mjmlData.children, { tagName: 'mj-breakpoint' });
    if (breakpointBlock) {
      breakpointBlock.attributes.width;
    }
  };

  update(name: string, val: any) {
    set(this.mjmlData, name, val);
  }

  setData(val: any) {
    this.mjmlData = val;
  }
}
