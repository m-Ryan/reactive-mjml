import { BlockRenderer } from './components/BlockRenderer';
import { MjmlContext } from './context/MjmlContext';
import { IBlock } from './typings';
import { StyleRender } from './components/StyleRender';
import { GlobalContext } from './store/GlobalContext';

export class Mjml {
  context: GlobalContext;
  constructor(data: IBlock) {
    this.context = new GlobalContext(data);
  }

  render() {
    return (
      <>
        <StyleRender styles={this.context.headStyle} />
        <MjmlContext.Provider value={this.context}>
          {this.context.mjmlData.children?.map((item, index) => (
            <BlockRenderer key={index} data={item} containerWidth="" parent={null} />
          ))}
        </MjmlContext.Provider>
      </>
    );
  }
}
