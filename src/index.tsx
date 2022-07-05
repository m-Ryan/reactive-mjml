import { observer } from 'mobx-react';

import { observable } from 'mobx';
import { getTestMjml } from './utils/getTestMjml';
import { Mjml } from './blocks/Mjml';
import { Component } from 'react';
import { render } from 'react-dom';

const data = observable(getTestMjml());
const App = observer(
  class App extends Component {
    render() {
      return <Mjml data={data} />;
    }
  },
);
render(<App />, document.getElementById('root') as HTMLElement);
