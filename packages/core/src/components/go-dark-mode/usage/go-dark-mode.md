<go-dark-mode id="themer"></go-dark-mode>
<go-center height="100vh">
<go-switch id="switcher" label="Dark Mode"></go-switch>
</go-center>

<script>
const themer = document.getElementById('themer');
const switcher = document.getElementById('switcher');
themer.addEventListener('themechange', (e) => {
  switcher.setAttribute('checked', e.detail.theme === 'dark');
});
switcher.addEventListener('change', (e) => {
  themer.setTheme(e.target.checked ? 'dark' : 'light');
});
</script>
