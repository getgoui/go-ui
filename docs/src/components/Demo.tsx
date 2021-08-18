import React from 'react';
import demoHtml from '!!raw-loader!../../static/demo-assets/demo.html';
import Frame, { useFrame } from 'react-frame-component';
import CodeBlock from '@theme/CodeBlock';
import './Demo.scss';

const DemoInner = ({ code }) => {
  // Hook returns iframe's window and document instances from Frame context
  const { document, window } = useFrame();
  console.log(document.body);
  const root = document.querySelector('#root');
  root.innerHTML = code;
  return null;
};

const Demo = ({ code }) => (
  <div className="demo-container">
    <Frame initialContent={demoHtml}>
      <DemoInner code={code} />
    </Frame>
    <details>
      <summary>Source code</summary>
      <CodeBlock className="language-jsx">{code}</CodeBlock>
    </details>
  </div>
);

export default Demo;
