import { BlockRenderer } from '@src/components/BlockRenderer';
import { MjmlContext } from '@src/context/MjmlContext';
import { GlobalContext } from '@src/store/GlobalContext';
import { IBlock } from '@src/typings';
import { find, isEmpty, map } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

export class Mjml extends Component<{ data: IBlock; }> {
  state = new GlobalContext();


  render() {
    const data = this.props.data;

    const mjBody = find(data.children, { tagName: 'mj-body' });

    // const mjHead = find(data.children, { tagName: 'mj-head' })
    if (!mjBody) {
      throw new Error('Invalid data');
    }

    return (
      <MjmlContext.Provider value={this.state}>
        {data.children?.map((item, index) => (
          <BlockRenderer key={index} data={item} containerWidth="" parent={null} />
        ))}
        <MediaQueries context={this.state} />
      </MjmlContext.Provider>
    );
  }

}

export const MediaQueries = observer(({ context }: { context: GlobalContext; }) => {
  const { mediaQueries, breakpoint } = context.data;

  if (isEmpty(mediaQueries)) {
    return null;
  }

  const baseMediaQueries = map(
    mediaQueries,
    (mediaQuery, className) => `.${className} ${mediaQuery}`,
  );
  const thunderbirdMediaQueries = map(
    mediaQueries,
    (mediaQuery, className) => `.moz-text-html .${className} ${mediaQuery}`,
  );

  return (
    <>
      <style type="text/css">
        {`@media only screen and (min-width:${breakpoint}) {${baseMediaQueries.join(
          '\n',
        )}}`}
      </style>
      <style media={`screen and (min-width:${breakpoint})`}>
        {thunderbirdMediaQueries.join('\n')}
      </style>
    </>
  );
});
