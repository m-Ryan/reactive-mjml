import { observer } from 'mobx-react';

import { observable } from 'mobx';
import { getTestMjml } from './utils/getTestMjml';
import { Mjml } from './Mjml';
import { useRef } from 'react';
import { render } from 'react-dom';

const data = observable(getTestMjml());
const App = observer(() => {
  const content = useRef(new Mjml(data));
  return content.current.render();
});

render(<App />, document.getElementById('root') as HTMLElement);
