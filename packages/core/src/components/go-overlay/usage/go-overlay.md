<style>
  .skeleton {
    width: 100%;
    height: 120vh;
    background: var(--go-color-secondary-100);
    margin: 2rem 0;
  }
</style>

<go-overlay id="overlay">
  <div style="background: var(--go-color-lightest); text-align: center; padding: 5vw">
    <div>
      <a href="#123">123</a>
      <go-button variant="primary" id="close-btn" block="mobile">Close overlay (via method)</go-button>
      <go-button variant="primary" id="close-btn-attr" block="mobile">Close overlay (via updating attribute)</go-button>
    </div>
  </div>
</go-overlay>

<div class="container">
  <div class="container">
    <p style="position: sticky; top: 0; background: var(--go-color-lightest)">
      <go-button id="btn">Show overlay</go-button>
    </p>
    <p>Overlay should capture the keyboard focus.</p>
    <p>Overlay should also prevent body from scrolling when active.</p>
    <p>See <a href="https://www.w3.org/TR/wai-aria-practices/#dialog_modal" target="_blank" rel="nofollow noopener">WAI Design Pattern</a> for more details.</p>

    <a href="#">Focus</a>
    <a href="#">Focus</a>
    <a href="#">Focus</a>
    <a href="#">Focus</a>
    <a href="#">Focus</a>

    <div class="skeleton"></div>
  </div>
</div>

<script>
  const overlay = document.querySelector('#overlay');

  document.querySelector('#btn').addEventListener('click', () => {
    overlay.open();
  });
  document.querySelector('#close-btn').addEventListener('click', () => {
    overlay.close();
  });
  document.querySelector('#close-btn-attr').addEventListener('click', () => {
    overlay.removeAttribute('active');
  });
</script>
