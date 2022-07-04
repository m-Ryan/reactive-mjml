import mjml from 'mjml-browser';
const mjmlText = `<mjml>
<mj-body>
<mj-section padding="0px" ><mj-column ><mj-carousel align="center" left-icon="https://easy-email-m-ryan.vercel.app/images/82f6f893-43ed-4f3d-9a17-4740bda844de-3318b36c-199d-46fe-96b8-38d1f17ef0c1.png" right-icon="https://easy-email-m-ryan.vercel.app/images/f1ece227-e050-4751-b064-aaeeabd5bfde-d459e9a2-b192-417b-8a77-2297b29e814e.png" icon-width="44px" thumbnails="visible" >
      <mj-carousel-image src="https://easy-email-m-ryan.vercel.app/images/f69f48af-5b15-40aa-91c4-81d601d1357b-083dc99d-02a6-40d9-ae28-0662bd078b5d.png" target="_blank" />


      <mj-carousel-image src="https://easy-email-m-ryan.vercel.app/images/9cce6b16-5a98-4ddb-b1a1-6cec2cf56891-c3acb856-8ab8-4cfb-93f9-2a0747678b8b.png" target="_blank" />


      <mj-carousel-image src="https://easy-email-m-ryan.vercel.app/images/d9795c1d-fa32-4adb-ab25-30b7cfe87936-df21314f-6f05-4550-80b3-9ab1107e8fbe.png" target="_blank" />
      </mj-carousel></mj-column></mj-section>
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
