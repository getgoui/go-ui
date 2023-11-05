import { newE2EPage } from '@stencil/core/testing';

describe('go-card-row', () => {
  it('renders', async () => {
    const imgSrc = `https://images.hindustantimes.com/img/2022/05/21/550x309/5b88b514-d944-11ec-9c44-6c63284ff8c5_1653164935635.jpg`;
    const page = await newE2EPage({
      html: `<div class="container">
      <go-card-row heading="Dog quotes" more-link-href="#" more-link-text="More quotes">
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          Everything I know I learned from dogs
          <em slot="footer">Nora Roberts (author, The Search)</em>
        </go-card>
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          Dogs do speak, but only to those who know how to listen
          <em slot="footer">Orhan Pamuk (author, My Name Is Red)</em>
        </go-card>
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          The better I get to know men, the more I find myself loving dogs
          <em slot="footer">Charles De Gaulle</em>
        </go-card>
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          Everything I know I learned from dogs
          <em slot="footer">Nora Roberts (author, The Search)</em>
        </go-card>
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          Dogs do speak, but only to those who know how to listen
          <em slot="footer">Orhan Pamuk (author, My Name Is Red)</em>
        </go-card>
        <go-card href="#" heading="Dog quote" sub-heading="Subtitle">
          <img src="${imgSrc}" alt="Poster" slot="media" />
          The better I get to know men, the more I find myself loving dogs
          <em slot="footer">Charles De Gaulle</em>
        </go-card>
      </go-card-row>
    </div>
    `,
    });
    const element = await page.find('go-card-row');
    expect(element).toHaveClass('hydrated');
    await expect(page).toPassA11y();
  });
});
