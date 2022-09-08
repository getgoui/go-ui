<div class="container" id="container"></div>
<script>
  const container = document.querySelector('#container');
  let rowHtml = `<go-card-row stagger="300" cols="1" cols-tablet="2" cols-desktop="3" cols-large="3">`;

  fetch('https://imdb-api.com/en/API/MostPopularMovies/k_p38bst22')
    .then(res => res.json())
    .then(res => {
      const movies = res.items;
      console.log({ movies });
      movies.forEach(movie => {
        if (movie) {
          const encodedTitle = encodeURIComponent(movie.title);
          const card = `
          <go-card card-title="${movie.fullTitle}" card-subtitle="${movie.year}">
            <img src="${movie.image}" alt="Poster" slot="media" />

            <ul>
              <li><strong>Crew:</strong> ${movie.crew}</li>
              <li><strong>IMDb rating:</strong> ${movie.imDbRating} (${movie.imDbRatingCount})</li>
            </ul>

            <div slot="footer">
              <go-button block="mobile" variant="primary" target="_blank" href="https://www.youtube.com/results?search_query=${encodedTitle}">Watch trailer</go-button>
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