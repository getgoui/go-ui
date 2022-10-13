import { INavItem } from '@go-ui/core/dist/types/interfaces';
import JsonDocsComponent from './component.type';

export interface SiteConfig {
  name: string;
  tagline?: string;
  logo?: string;
  logoDark?: string;
  logoSocial?: string;
  baseUrl?: string;
  docsRoutePrefix?: string;
  repoLink?: INavItem;
  darkThemeSwitch?: boolean;
  head?: string;
  navbar?: {
    main: INavItem[];
  };
  footer?: {
    isDark?: boolean;
    links?: INavItem[];
    copyright?: string;
    bottom?: string;
  };
  algolia?: {
    // The application ID provided by Algolia
    appId: string;
    // Public API key: it is safe to commit it
    apiKey: string;
    indexName: string;
  };
  sidebar?: {
    componentPrefix?: string;
    /**
     * Convert tag to human-friendly label, default: [startCase](https://lodash.com/docs/4.17.15#startCase)
     * @param tag component tag
     */
    tagToLabel?: (tag: string) => string;
  };
  demo?: {
    head?: string;
    styles?: string[];
    scripts?: { src: string; attrs: string }[];
  };
  socialLinks?: INavItem[];
  componentDocs?: JsonDocsComponent[];
}
