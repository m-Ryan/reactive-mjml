import { observer } from 'mobx-react';

export const StyleRender = observer(
  (props: {
    styles: {
      inline: string;
      content: string;
    }[];
  }) => {
    return (
      <>
        {props.styles.map((item, index) => (
          <style key={index}>{item.content}</style>
        ))}
      </>
    );
  },
);
