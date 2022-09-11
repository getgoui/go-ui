import { createStore } from '@stencil/store';
import { getCurrentTheme, Theme } from '../utils/helpers';

export default createStore({
  currentTheme: getCurrentTheme() as Theme,
});
