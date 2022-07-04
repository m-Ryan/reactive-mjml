import mjml from 'mjml-browser';
const mjmlText = `<mjml>
<mj-head>
  <mj-attributes>
    <mj-text padding="0" />
    <mj-class name="blue" color="blue" />
    <mj-class name="big" font-size="20px" />
    <mj-all font-family="Arial" />
  </mj-attributes>
</mj-head>
<mj-body>
  <mj-section>
    <mj-column>
      <mj-text mj-class="blue big">
        Hello World!
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>`;

export const getTestMjml = () => {
  return mjml(mjmlText).json;
};
