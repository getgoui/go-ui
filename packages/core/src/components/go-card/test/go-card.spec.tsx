import { newSpecPage } from '@stencil/core/testing';
import { GoLink } from '../../go-link/go-link';
import { GoCard } from '../go-card';
describe('go-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoCard],
      html: `<go-card></go-card>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders card heading', async () => {
    const page = await newSpecPage({
      components: [GoCard],
      html: `<go-card heading="hello"></go-card>`,
    });
    expect(page.root.querySelector('h2').innerText).toEqual('hello');
  });

  it('renders card sub heading', async () => {
    const page = await newSpecPage({
      components: [GoCard],
      html: `<go-card heading="hello" sub-heading="world"></go-card>`,
    });
    expect(page.root.querySelector('h3').innerText).toEqual('world');
  });

  it('renders card slots', async () => {
    const page = await newSpecPage({
      components: [GoCard],
      html: `<go-card heading="hello">
        <img src="https://placehold.it/300x300" slot="media" />
        <p id="pre-heading" slot="pre-heading">pre-heading</p>
        <div id="custom-heading" slot="heading">custom heading</div>
        yo
        <div id="footer" slot="footer">footer</div>
      </go-card>`,
    });
    expect(page.root.querySelector('.card-media img').getAttribute('src')).toEqual('https://placehold.it/300x300');
    const preTitle = page.root.querySelector('#pre-heading');
    const customTitle = page.root.querySelector('#custom-heading');
    const titleContainer = page.root.querySelector('.card-heading-section');
    expect(titleContainer.contains(preTitle)).toBeTruthy();
    expect(titleContainer.contains(customTitle)).toBeTruthy();
    const footerEl = page.root.querySelector('#footer');
    const footerContainer = page.root.querySelector('.card-footer');
    expect(footerContainer.contains(footerEl)).toBeTruthy();
    const contentContainer = page.root.querySelector('.card-content');
    expect(contentContainer.contains(preTitle)).toBeFalsy();
    expect(contentContainer.contains(customTitle)).toBeFalsy();
    expect(contentContainer.contains(footerEl)).toBeFalsy();
    expect((contentContainer as HTMLElement).innerText.trim()).toEqual('yo');
  });

  it('renders link when href is present', async () => {
    const page = await newSpecPage({
      components: [GoCard, GoLink],
      html: `<go-card heading="hello" href="#link" target="_blank">
      content
      </go-card>`,
    });
    const title = page.root.querySelector('.card-heading');
    expect(title).toBeTruthy();
    const linkEl = title.querySelector('go-link a');
    expect(linkEl).toBeTruthy();
    expect(linkEl.getAttribute('href')).toEqual('#link');
    expect(linkEl.getAttribute('target')).toEqual('_blank');
  });
});
