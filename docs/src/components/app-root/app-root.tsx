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
        <div class="page-main">
          <Router.Switch>
            <Route path="/">
              <page-transition activePath={activePath}>
                <page-home></page-home>
              </page-transition>
            </Route>

            <Route path={/docs\/.*/} render={(params) => <page-docs params={params}></page-docs>}></Route>

            <Route path={/.*/} render={(params) => <page-standard params={params}></page-standard>}></Route>
          </Router.Switch>
        </div>

        <app-footer></app-footer>
      </Host>
    );
  }
}
