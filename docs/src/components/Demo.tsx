import './Demo.scss';
import React, { useState, useEffect, useRef } from 'react';
// import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';

import demoTemplate from '!!raw-loader!../../static/demo-assets/demo.html';
// import icons svg from assets folder
import PhoneIcon from '../assets/icons/phone.svg';
import TabletIcon from '../assets/icons/tablet.svg';
import LaptopIcon from '../assets/icons/laptop.svg';
import ExternalIcon from '../assets/icons/external-link.svg';

const setDemoContent = (window, code) => {
  const doc = window.document;
  const html = demoTemplate.replace('{🔥🔥🔥}', code);
  doc.open();
  doc.write(html);
  doc.close();
};

const DemoFrame = ({ code, onLoad, onResize, colorScheme = null }) => {
  const demoFrame = useRef(null);
  // onload content
  useEffect(() => {
    if (demoFrame.current) {
      const window = demoFrame.current.contentWindow;
      setDemoContent(window, code);
      const resizeHandler = (e) => {
        onResize(e.target);
      };

      window.addEventListener('resize', resizeHandler);

      window.addEventListener('load', () => onLoad(window));

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [code, colorScheme]);

  return <iframe title="demo frame" ref={demoFrame} />;
};

const Demo = ({ code, hideSource = false }) => {
  const [resizingX, setResizingX] = useState(false);
  const [resizingY, setResizingY] = useState(false);
  const [contentWidth, setContentWidth] = useState('100%');
  const [contentHeight, setContentHeight] = useState('100%');
  const [actualFrameHeight, setActualFrameHeight] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const contentEl = useRef(null);
  const minFrameHeight = 400;
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

  const resizeToDevice = (device) => {
    let width = device === 'phone' ? '375px' : device === 'tablet' ? '768px' : device === 'laptop' ? '1200px' : '100%';
    setContentWidth(width);
  };
  const openNewWindow = () => {
    var win = window.open('', 'Demo');
    setDemoContent(win, code);
  };
  const frameHeightBuffer = 80;
  return (
    <div className="demo-container">
      <div className="fake-browser">
        <div className="top-bar">
          <div className="dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <div className="controls">
            <div className="devices">
              <button title="New window" type="button" onClick={openNewWindow}>
                <ExternalIcon />
              </button>
              <button title="Mobile view" type="button" onClick={() => resizeToDevice('phone')}>
                <PhoneIcon />
              </button>
              <button title="Tablet view" type="button" onClick={() => resizeToDevice('tablet')}>
                <TabletIcon />
              </button>
              <button title="Desktop view" type="button" onClick={() => resizeToDevice('laptop')}>
                <LaptopIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          className={'content ' + (loaded ? 'loaded' : '')}
          ref={contentEl}
          style={{
            width: contentWidth,
            height: contentHeight,
          }}>
          <div className="frame-wrapper">
            {resizingX || resizingY ? <div className="resize-overlay"></div> : null}
            <DemoFrame
              code={code}
              onLoad={(frameWindow) => {
                setTimeout(() => {
                  setContentHeight(frameHeightBuffer + frameWindow.document.body.getBoundingClientRect().height + 'px');
                  setLoaded(true);
                }, 1000);
              }}
              onResize={(frameWindow) => {
                setActualFrameHeight(frameWindow.document.body.getBoundingClientRect().height);
              }}
            />
          </div>
          <button
            type="button"
            onMouseDown={startResizeX}
            onDoubleClick={() => setContentWidth('100%')}
            className="resize-handle x-axis"
            title="Drag to resize, double click to reset">
            <span>||</span>
          </button>
          <button
            type="button"
            onMouseDown={startResizeY}
            onDoubleClick={() => setContentHeight(`${actualFrameHeight + frameHeightBuffer}px`)}
            className="resize-handle y-axis"
            title="Drag to resize, double click to show full content">
            <span>||</span>
          </button>

          {loaded ? null : <div className="loading-overlay">Loading demo...</div>}
        </div>
      </div>
      {!hideSource ? (
        <details className="source-code">
          <summary>Source code</summary>
          <CodeBlock className="language-jsx">{code}</CodeBlock>
        </details>
      ) : null}
    </div>
  );
};

export default Demo;
