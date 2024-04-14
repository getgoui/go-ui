<div class="container">
<h2>Imdb Top 100</h2>
</div>
<div class="container" id="container"></div>
<script>
const container = document.querySelector('#container');
let rowHtml = `<go-card-row stagger="300" cols="1" cols-tablet="2" cols-desktop="3" cols-large="3">`;
const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
method: 'GET',
headers: {
  'X-RapidAPI-Key': '26d5ea4aa4msh427ff8245a309b4p15aafcjsn21084a0772db',
  'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
},
};

fetch(url, options)
.then((res) => res.json())
.then((res) => {
const movies = res;
console.log({ movies });
movies.forEach((movie) => {
if (movie) {
const encodedTitle = encodeURIComponent(movie.title);
const card = `<go-card border heading="${movie.title}" sub-heading="Rank ${movie.rank}">
${movie.image ?`<img src="${movie.image}" alt="${movie.title}" slot="media" />` : ''}

<p>${movie.description}</p>
<dl>
  <dt>Genre</dt>
  <dd>${movie.genre.join(', ')}</dd>
  <dt>Rating</dt>
  <dd>${movie.rating}</dd>
  <dt>Year</dt>
  <dd>${movie.year}</dd>
</dl>

<div slot="footer">
<go-button-group block="mobile">

<go-button variant="primary" href="${movie.imdb_link}">View on Imdb</go-button>
<go-button  variant="secondary" target="_blank" href="https://www.youtube.com/results?search_query=${encodedTitle}">Search on YouTube</go-button>
</go-button-group>

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
