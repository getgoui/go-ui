## go-card-row API

<!-- Auto Generated Below -->


## Usage

### Go-card-row

<div class="container">
  <go-card-row heading="Dog quotes" more-link-href="#" more-link-text="More quotes">
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      Everything I know I learned from dogs
      <em slot="footer">Nora Roberts (author, The Search)</em>
    </go-card>
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      Dogs do speak, but only to those who know how to listen
      <em slot="footer">Orhan Pamuk (author, My Name Is Red)</em>
    </go-card>
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      The better I get to know men, the more I find myself loving dogs
      <em slot="footer">Charles De Gaulle</em>
    </go-card>
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      Everything I know I learned from dogs
      <em slot="footer">Nora Roberts (author, The Search)</em>
    </go-card>
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      Dogs do speak, but only to those who know how to listen
      <em slot="footer">Orhan Pamuk (author, My Name Is Red)</em>
    </go-card>
    <go-card href="#" card-title="Dog quote" card-subtitle="Subtitle">
      <img src="//source.unsplash.com/random/800x600?dog" alt="Poster" slot="media" />
      The better I get to know men, the more I find myself loving dogs
      <em slot="footer">Charles De Gaulle</em>
    </go-card>
  </go-card-row>
</div>


### Go-card-row-dynamic

<div class="container" id="container"></div>
<script>
  const container = document.querySelector('#container');
  let rowHtml = `<go-card-row stagger="300" cols="1" cols-tablet="2" cols-desktop="3" cols-large="3">`;

  fetch(
    'https://mcuapi.herokuapp.com/api/v1/movies?page=1&limit=10&columns=title%2Coverview%2Crelease_date%2Ccover_url%2Ctrailer_url&order=chronology%2CDESC&filter=phase%3D3',
  )
    .then((res) => res.json())
    .then((res) => {
      const movies = res.data;
      movies.forEach((movie) => {
        if (movie) {
          const card = `
          <go-card card-title="${movie.title}" card-subtitle="${movie.release_date}">
            <img src="${movie.cover_url}" alt="Poster" slot="media" />
            ${movie.overview.substr(0, 400)}...
            <div slot="footer">
              <go-button block="mobile" variant="primary" target="_blank" href="${movie.trailer_url}">Watch trailer</go-button>
            </div>
          </go-card>`;
          rowHtml += card;
        }
      });
    })
    .finally(() => {
      rowHtml += `</go-card-row>`;
      container.innerHTML = rowHtml;
    });
</script>



## Properties

| Property       | Attribute        | Description                                                                                                                                                                                                                                        | Type      | Default     |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `cols`         | `cols`           | Number of columns from mobile breakpoint and up                                                                                                                                                                                                    | `number`  | `1`         |
| `colsDesktop`  | `cols-desktop`   | Number of columns from desktop breakpoint and up                                                                                                                                                                                                   | `number`  | `3`         |
| `colsLarge`    | `cols-large`     | Number of columns from large breakpoint and up                                                                                                                                                                                                     | `number`  | `4`         |
| `colsTablet`   | `cols-tablet`    | Number of columns from tablet breakpoint and up                                                                                                                                                                                                    | `number`  | `2`         |
| `heading`      | `heading`        | Heading for this card row section                                                                                                                                                                                                                  | `string`  | `undefined` |
| `moreLinkHref` | `more-link-href` | View more link href                                                                                                                                                                                                                                | `string`  | `undefined` |
| `moreLinkText` | `more-link-text` | View more link text                                                                                                                                                                                                                                | `string`  | `undefined` |
| `noStretch`    | `no-stretch`     | By default, `go-card-row` stretches all cards inside to the tallest card in view, unless this property is set to true.                                                                                                                             | `boolean` | `false`     |
| `stagger`      | `stagger`        | If set, cards will fade in one by one with the specified delay in milliseconds when they are in the viewport. uses `IntersectionObserver`, [see browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | `number`  | `undefined` |


## Slots

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `"default"` | Default slot, to be filled with `go-card` elements       |
| `"heading"` | Overwrite default `h2` heading for this card row section |


## Dependencies

### Depends on

- [go-nav-link](../../components/navigation/go-nav-link)

### Graph
```mermaid
graph TD;
  go-card-row --> go-nav-link
  go-nav-link --> go-icon
  style go-card-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
