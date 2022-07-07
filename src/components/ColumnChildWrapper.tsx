import { BodyComponent } from './BodyComponent';

export const ColumnChildWrapper = ({
  com,
  children,
}: {
  com: BodyComponent<any>;
  children: React.ReactNode;
}) => {
  return (
    <tr>
      <td
        {...com.htmlAttributes(
          {
            align: com.getAttribute('align'),
            'vertical-align': com.getAttribute('vertical-align'),
            class: com.getAttribute('css-class'),
            style: {
              background: com.getAttribute('container-background-color'),
              'font-size': '0px',
              padding: com.getAttribute('padding'),
              'padding-top': com.getAttribute('padding-top'),
              'padding-right': com.getAttribute('padding-right'),
              'padding-bottom': com.getAttribute('padding-bottom'),
              'padding-left': com.getAttribute('padding-left'),
              'word-break': 'break-word',
            },
          } as any,
          false,
        )}
      >
        {children}
      </td>
    </tr>
  );
};
