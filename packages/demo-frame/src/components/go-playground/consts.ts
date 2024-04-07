export const PLACEHOLDER_CONTENT = `<div class="container">
  <h1>Go UI playground</h1>
  <go-input label="Name" value="Sean"></go-input>
  <go-button variant="primary" id="button">Click me</go-button>

  <pre id="output"></pre>
</div>

<script>
  const btn = document.getElementById('button')
  const output = document.getElementById('output')
  const input = document.querySelector('go-input')
  btn.addEventListener('click', () => {
  output.innerHTML = "You entered: " + input.value
  })
</script>
`;
export const GO_UI_HEAD = `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.esm.js"></script>
`;

export const GO_UI_SITE_URL = 'https://go-ui.com';
