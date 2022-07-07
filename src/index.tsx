// import { observer } from 'mobx-react';

// import { observable, toJS } from 'mobx';
// import { getTestMjml } from './utils/getTestMjml';
// import { Mjml } from './Mjml';
// import { useRef } from 'react';
// import { render } from 'react-dom';

// const data = observable(getTestMjml());
// console.log('data', toJS(data));
// const App = observer(() => {
//   const content = useRef(new Mjml(data));
//   return content.current.render();
// });

// render(<App />, document.getElementById('root') as HTMLElement);

export { Mjml } from './Mjml';
export { xmlToJson } from './utils/xmlToJson';
export { jsonToXML } from './utils/jsonToXML';
