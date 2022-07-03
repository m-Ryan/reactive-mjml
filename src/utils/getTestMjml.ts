import mjml from 'mjml-browser';
const mjmlText = `<mjml>
<mj-body>
<mj-section padding="20px" background-color="#ffffff">
<mj-column background-color="#dededd">
  <mj-accordion>
    <mj-accordion-element>
      <mj-accordion-title>Why use an accordion?</mj-accordion-title>
      <mj-accordion-text>
        <span style="line-height:20px">
          Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.
        </span>
      </mj-accordion-text>
    </mj-accordion-element>
    <mj-accordion-element>
      <mj-accordion-title>How it works</mj-accordion-title>
      <mj-accordion-text>
        <span style="line-height:20px">
          Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once.
        </span>
      </mj-accordion-text>
    </mj-accordion-element>
  </mj-accordion>
</mj-column>
</mj-section>
  <mj-section background-color="green">
    <mj-column>
      <mj-image width="100px" src="https://mjml.io/assets/img/logo-small.png"></mj-image>
      <mj-divider padding="0px" border-color="#F45E43"></mj-divider>
      <mj-text font-size="40px" color="#F45E43" font-family="helvetica">Hello World</mj-text>
      <mj-button font-size="20px" align="center">Hello World</mj-button>

    </mj-column>
  </mj-section>
  <mj-section background-color="blue">
    <mj-column>
      <mj-image width="100px" src="https://mjml.io/assets/img/logo-small.png"></mj-image>
    </mj-column>
    <mj-column>
    <mj-image width="100px" src="https://mjml.io/assets/img/logo-small.png"></mj-image>
  </mj-column>
  </mj-section>
  <mj-section background-color="yellow">
   <mj-group>
      <mj-column>
      <mj-image width="100px" src="https://mjml.io/assets/img/logo-small.png"></mj-image>
    </mj-column>
    <mj-column>
      <mj-image width="100px" src="https://mjml.io/assets/img/logo-small.png"></mj-image>
    </mj-column>
   </mj-group>
  </mj-section>
  <mj-hero
    mode="fixed-height"
    height="469px"
    background-width="600px"
    background-height="469px"
    background-url=
        "https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg"
    background-color="#2a3448"
    padding="100px 0px">
    <mj-text
      padding="20px"
      color="#ffffff"
      font-family="Helvetica"
      align="center"
      font-size="45px"
      line-height="45px"
      font-weight="900">
      GO TO SPACE
    </mj-text>
    <mj-button href="https://mjml.io/" align="center">
      ORDER YOUR TICKET NOW
    </mj-button>
  </mj-hero>
</mj-body>
</mjml>`;

export const getTestMjml = () => {
  return mjml(mjmlText).json;
};
