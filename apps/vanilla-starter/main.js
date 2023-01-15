import '@go-ui/core/dist/go-ui/go-ui.css';
import '@go-ui/core';
import { setupCounter } from './counter.js';
setupCounter(document.querySelector('#counter-btn'), document.querySelector('#count'));
