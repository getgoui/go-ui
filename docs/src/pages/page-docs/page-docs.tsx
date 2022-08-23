import { Component, Prop, State, h } from '@stencil/core';
import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import docs, { JsonDocsComponent } from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { removeLeadingSlash, siteUrl } from '../../utils/helpers';
import siteConfig from '../../../config';
import { groupBy } from 'lodash-es';

const routePrefix = 'docs/';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
md.use(meta);

@Component({
  tag: 'page-docs',
  styleUrl: 'page-docs.scss',
})
export class PageDocs {
  @Prop() params: {
    [param: string]: string;
  };

  @State() notfound: boolean = false;
  @State() result = '';

  // private source = '';
  private pageName = '';
  private sidebarNavItems = [] as INavItem[];

  private currentPath = '';
  private currentPathParts = [];
  private meta = null;

  async componentWillLoad() {
    let url = this.params[0];
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    this.currentPath = url.replace(routePrefix, '');
    const pathParts = this.currentPath.split('/');
    this.pageName = pathParts.pop();
    this.currentPathParts = pathParts;
    await this.loadPage();
    await this.loadSidebarNav();
  }

  async loadPage() {
    const compDocs = docs.components.find(comp => comp.tag === this.pageName);
    if (compDocs) {
      this.result = md.render(compDocs.readme);
      this.meta = md.meta;
      return;
    }

    // not found, fetch content dir
    try {
      console.log('doc not found, looking for content pages' + `/assets/content/docs/${this.currentPath}.md`);
      let response = await fetch(siteUrl('/assets/content/docs/' + this.currentPath + '.md'));
      if (response.status !== 200) {
        throw new Error("Page doesn't exist");
      }

      this.notfound = false;
      let text = await response.text();
      this.result = md.render(text);
      this.meta = md.meta;
    } catch (error) {
      this.notfound = true;
    }
  }

  async loadSidebarNav() {
    const links = docs.components.map((comp: JsonDocsComponent) => {
      const path = this.buildSidebarItemUrl(comp, false);
      const parents = path.split('/');
      parents.pop();
      return {
        url: siteUrl(routePrefix + path),
        label: siteConfig.sidebar.tagToLabel(comp.tag),
        path,
        parents,
      };
    });

    let sidebar = groupBy(links, item => item.parents[0]);

    console.log({ sidebar });
    // links.forEach((navItem: INavItem) => {
    //   console.log(navItem);
    // });

    // const relevantComps = docs.components.filter((comp: JsonDocsComponent) => {
    //   const relativePath = this.buildSidebarItemUrl(comp, false);
    //   console.log(relativePath, this.currentPathParts);

    //   return comp.filePath.includes(this.currentPath);
    // });
    // console.log({ relevantComps });
    docs.components.forEach((comp: JsonDocsComponent) => {
      const url = siteUrl(this.buildSidebarItemUrl(comp));
      const path = removeLeadingSlash(url.replace(routePrefix, ''));
      const parents = path.split('/');
      parents.pop();

      // let label = siteConfig.sidebar.tagToLabel(comp.tag);
    });

    // console.log(structure);
  }

  buildSidebarItemUrl(comp: JsonDocsComponent, withPrefix = true): string {
    return comp.filePath.substring(0, comp.filePath.lastIndexOf('/')).replace('./src/', withPrefix ? routePrefix : '');
  }

  render() {
    const { result, sidebarNavItems, meta } = this;
    return [
      <seo-tags pageTitle={meta.title}></seo-tags>,
      <div class="sidebar-layout">
        <aside>
          <div class="sidebar">
            <go-nav-list items={sidebarNavItems}></go-nav-list>
          </div>
        </aside>
        <main>
          <div class="container">
            <div class="row">
              <div class="col-12 col-desktop-9">
                <div class="content-container" innerHTML={result}></div>
              </div>
              <div class="d-none d-block-desktop col-desktop-3">
                <go-toc class="toc" selector=".content-container h2" label-class="h6"></go-toc>
              </div>
            </div>
          </div>
        </main>
      </div>,
    ];
  }
}
