import type MarkdownIt from 'markdown-it';
import iterator from 'markdown-it-for-inline';
import mdContainer from 'markdown-it-container';

// add go-ui markdown renderer
export function goUiPlugin(md: MarkdownIt): void {
  // banner
  const bannerOptions = ['info', 'critical', 'success'];
  bannerOptions.forEach((type) => {
    md.use(mdContainer, type, {
      render: function (tokens, idx) {
        const regex = new RegExp(`^${type}\\s+(.*)$`, '');
        var m = tokens[idx].info.trim().match(regex);
        if (tokens[idx].nesting === 1) {
          // opening tag
          const headingAttr = m && m[1] ? ` heading="${m[1]}"` : ``;
          return `<go-banner variant="${type}" ${headingAttr}>\n`;
        } else {
          // closing tag
          return '</go-banner>\n';
        }
      },
    });
  });
  // links
  md.use(iterator, 'go-link', 'link_open', function (tokens, idx) {
    // Make sure link contains only text
    if (tokens[idx + 2].type !== 'link_close' || tokens[idx + 1].type !== 'text') {
      return;
    }
    // Do replacement
    tokens[idx].tag = 'go-link';
    tokens[idx + 2].tag = 'go-link';
  });
}
