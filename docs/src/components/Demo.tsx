import './Demo.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import React, { useState, useEffect, useRef } from 'react';
import demoTemplate from '!!raw-loader!../../static/demo-assets/demo.html';

const DemoFrame = ({ code }) => {
  const demoFrame = useRef(null);

  useEffect(() => {
    if (demoFrame.current) {
      const doc = demoFrame.current.contentWindow.document;
      const html = demoTemplate.replace('{🔥🔥🔥}', code);
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [code]);
  return <iframe ref={demoFrame} />;
};

const Demo = ({ code }) => {
  const [resizingX, setResizingX] = useState(false);
  const [resizingY, setResizingY] = useState(false);
  const [contentWidth, setContentWidth] = useState('100%');
  const [contentHeight, setContentHeight] = useState('100%');
  const contentEl = useRef(null);
  const minFrameHeight = 200;
  const startResizeX = () => {
    setResizingX(true);
    const onResizeX = (e) => {
      if (!contentEl?.current) {
        return;
      }
      setContentWidth(e.clientX - contentEl.current.getBoundingClientRect().left + 'px');
    };

    document.addEventListener('mousemove', onResizeX);
    document.addEventListener('mouseup', () => {
      setResizingX(false);
      document.removeEventListener('mousemove', onResizeX);
    });
  };
  const startResizeY = () => {
    setResizingY(true);
    const onResizeY = (e) => {
      if (!contentEl?.current) {
        return;
      }
      let height = e.clientY - contentEl.current.getBoundingClientRect().top;
      if (height <= minFrameHeight) {
        height = minFrameHeight;
      }
      setContentHeight(height + 'px');
    };
    document.addEventListener('mousemove', onResizeY);
    document.addEventListener('mouseup', () => {
      setResizingY(false);
      document.removeEventListener('mousemove', onResizeY);
    });
  };
  return (
    <div className="demo-container">
      <div className="fake-browser">
        <div className="top-bar">
          <div className="dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <div className="controls">...</div>
        </div>

        <div
          className="content"
          ref={contentEl}
          style={{
            'width': contentWidth,
            'height': contentHeight,
            '--min-frame-height': minFrameHeight + 'px',
          }}>
          <div className="frame-wrapper">
            {resizingX || resizingY ? <div className="resize-overlay"></div> : null}
            <DemoFrame code={code} />
          </div>
          <button type="button" onMouseDown={startResizeX} className="resize-handle x-axis">
            <span>||</span>
          </button>
          <button type="button" onMouseDown={startResizeY} className="resize-handle y-axis">
            <span>||</span>
          </button>
        </div>
      </div>
      <details>
        <summary>Source code</summary>
        <CodeBlock className="language-jsx">{code}</CodeBlock>
      </details>
    </div>
  );
};

export default Demo;
