<go-content-layout
  breadcrumbs="[
 {
   label: 'Home',
   url: '#',
 },
 {
   label: 'Top level content page',
   url: '#',
 },
 {
   label: 'Parent page',
   url: '#',
 }
 ]"
  pre-heading="Content template"
  page-heading="Example page"
  intro="This page's layout is managed by go-content-layout, the content below comes from the readme markdown file of this project."
  id="layout">
  <go-md id="main" sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">
    <p>
      Sorry the content of this page couldn't be loaded,
      <a href="//raw.githubusercontent.com/getgoui/go-ui/main/README.md" target="_blank">see the source here</a>.
    </p>
  </go-md>
</go-content-layout>

<script>
  const main = document.querySelector('#main');
  const layout = document.querySelector('#layout');
  main.addEventListener('rendered', () => {
    layout.initToc();
  });
</script>
