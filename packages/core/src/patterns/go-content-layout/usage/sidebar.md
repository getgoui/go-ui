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
  toc
  id="layout"
  sidebar-sticky
  sidebar-mobile-position="start"
  sidebar-desktop-position="end">
<go-md id="main" sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">

<p>
Sorry the content of this page couldn't be loaded,
<a href="//raw.githubusercontent.com/getgoui/go-ui/main/README.md" target="_blank">see the source here</a>.
</p>
</go-md>

  <div slot="sidebar">
    <go-card heading="Sidebar card" sub-heading="Subtitle">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque natus autem veritatis architecto facilis

      <div slot="footer">
        <go-button variant="primary">Button</go-button>
      </div>
      <img src="//images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&amp;fit=crop&amp;w=600&amp;h=600&amp;q=80" alt="Photo" slot="media" />
      <div slot="pre-heading">Active 2 hours ago</div>
    </go-card>

  </div>
</go-content-layout>
