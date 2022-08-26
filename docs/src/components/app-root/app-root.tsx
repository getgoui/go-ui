import { Component, Host, h } from '@stencil/core';
import { Route } from 'stencil-router-v2';
import Router from '../../router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  render() {
    const activePath = Router.activePath;
    return (
      <Host>
        <app-header active-path={activePath}></app-header>
        <main>
          <Router.Switch>
            <Route path="/">
              <page-home></page-home>
            </Route>

            <Route path={/docs\/.*/} render={params => <page-docs params={params}></page-docs>}></Route>

            <Route path={/.*/}>
              <page-notfound></page-notfound>
            </Route>
          </Router.Switch>
        </main>

        <app-footer></app-footer>
      </Host>
    );
  }
}
