import { xmlToJson } from '../xmlToJson';

describe('Test xmlToJson', () => {
  it('should be expected', () => {
    const xml = `
      <mj-section background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center" padding="0px 0px 0px 0px" >
        <mj-column border="none" vertical-align="top" padding="0px 0px 0px 0px" >
          <mj-image align="center" height="auto" src="https://assets.maocanhua.cn/ed0590da-b6dc-4d14-bfc7-6f1931a390fd-image.png" target="_blank" width="600px" padding="0px 0px 0px 0px" ></mj-image>
        </mj-column>
    </mj-section>
    `;
    expect(xmlToJson(xml)).toEqual([
      {
        attributes: {
          'background-repeat': 'repeat',
          'background-size': 'auto',
          'background-position': 'top center',
          border: 'none',
          direction: 'ltr',
          'text-align': 'center',
          padding: '0px 0px 0px 0px',
        },
        tagName: 'mj-section',
        children: [
          {
            attributes: {
              border: 'none',
              'vertical-align': 'top',
              padding: '0px 0px 0px 0px',
            },
            tagName: 'mj-column',
            children: [
              {
                attributes: {
                  align: 'center',
                  height: 'auto',
                  src: 'https://assets.maocanhua.cn/ed0590da-b6dc-4d14-bfc7-6f1931a390fd-image.png',
                  target: '_blank',
                  width: '600px',
                  padding: '0px 0px 0px 0px',
                },
                tagName: 'mj-image',
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
