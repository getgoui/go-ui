import './Demo.scss';
import React, { useState, useEffect, useRef } from 'react';
// import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';

import demoTemplate from '!!raw-loader!../../static/demo-assets/demo.html';
// import icons svg from assets folder
import PhoneIcon from '../assets/icons/phone.svg';
import TabletIcon from '../assets/icons/tablet.svg';
import LaptopIcon from '../assets/icons/laptop.svg';
import DesktopIcon from '../assets/icons/desktop.svg';
import ExternalIcon from '../assets/icons/external-link.svg';

const setDemoContent = (window, code) => {
  const doc = window.document;
  const html = demoTemplate.replace('{🔥🔥🔥}', code);
  doc.open();
  doc.write(html);
  doc.close();
};

const DemoFrame = ({ code, onLoad, onResize = null, colorScheme = null }) => {
  const demoFrame = useRef(null);
  // onload content
  useEffect(() => {
    if (demoFrame.current) {
      const window = (demoFrame.current as HTMLIFrameElement).contentWindow;
      setDemoContent(window, code);
      const resizeHandler = e => {
        // onResize(e.target);
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
  const minFrameHeight = 200;
  const startResizeX = () => {
    setResizingX(true);
    const onResizeX = e => {
      if (!contentEl?.current) {
        return;
      }
      const frameWidth = Math.round(e.clientX - contentEl.current.getBoundingClientRect().left);
      setContentWidth(frameWidth + 'px');
    };

    document.addEventListener('mousemove', onResizeX);
    document.addEventListener('mouseup', () => {
      setResizingX(false);
      document.removeEventListener('mousemove', onResizeX);
    });
  };
  const startResizeY = () => {
    setResizingY(true);
    const onResizeY = e => {
      if (!contentEl?.current) {
        return;
      }
      let height = e.clientY - contentEl.current.getBoundingClientRect().top;
      if (height <= minFrameHeight) {
        height = minFrameHeight;
      }
      setContentHeight(Math.round(height) + 'px');
    };
    document.addEventListener('mousemove', onResizeY);
    document.addEventListener('mouseup', () => {
      setResizingY(false);
      document.removeEventListener('mousemove', onResizeY);
    });
  };

  const resizeToDevice = device => {
    const widthMap = {
      mobile: '375px',
      tablet: '600px',
      desktop: '1024px',
      large: '1440px',
    };
    let width = widthMap[device] || '100%';
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
              <button title="Open in new window" type="button" onClick={openNewWindow}>
                <ExternalIcon />
              </button>
              <button title="Mobile view" type="button" onClick={() => resizeToDevice('mobile')}>
                <PhoneIcon />
              </button>
              <button title="Tablet view" type="button" onClick={() => resizeToDevice('tablet')}>
                <TabletIcon />
              </button>
              <button title="Desktop view" type="button" onClick={() => resizeToDevice('desktop')}>
                <LaptopIcon />
              </button>
              <button title="Large view" type="button" onClick={() => resizeToDevice('large')}>
                <DesktopIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          className={'content ' + (loaded ? 'loaded' : '')}
          ref={contentEl}
          style={{
            'width': contentWidth,
            'height': contentHeight,
            '--min-frame-height': minFrameHeight + 'px',
          }}>
          <div className="frame-wrapper">
            {resizingX || resizingY ? (
              <div className="resize-overlay">
                {contentWidth} x {contentHeight}
              </div>
            ) : null}
            <DemoFrame
              code={code}
              onLoad={frameWindow => {
                setTimeout(() => {
                  const initialHeight = Math.ceil(frameHeightBuffer + frameWindow.document.body.getBoundingClientRect().height);
                  setContentHeight(initialHeight + 'px');
                  setLoaded(true);
                }, 500);
              }}
            />
          </div>
          <button type="button" onMouseDown={startResizeX} className="resize-handle x-axis">
            <span>||</span>
          </button>
          <button type="button" onMouseDown={startResizeY} className="resize-handle y-axis">
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
