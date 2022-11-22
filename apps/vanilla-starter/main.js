import '@go-ui/core/dist/go-ui/go-ui.css';
import { defineCustomElements } from '@go-ui/core/dist/loader/index.es2017';
import { setupCounter } from './counter.js';
defineCustomElements();
setupCounter(document.querySelector('#counter-btn'), document.querySelector('#count'));
