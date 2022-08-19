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
