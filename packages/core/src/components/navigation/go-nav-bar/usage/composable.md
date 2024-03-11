<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- composable nav bar -->
<go-nav-bar>
  <go-nav-item>
    <go-nav-link block url="#home" label="Home" icon="{name: 'home'}"></go-nav-link>
  </go-nav-item>
  <go-nav-item>
    <go-nav-submenu-trigger controls="submenu">
      <go-icon name="view_module"></go-icon>
      Components
    </go-nav-submenu-trigger>
    <go-nav-submenu id="submenu" columns="3">
      <h2 class="h6" slot="submenu-header">This is the heading of this submenu</h2>
      <go-nav-list>
        <go-nav-link
          block
          url="#item"
          label="List item 1"
          icon="{name: 'star'}"
          description="lorem ipsum"></go-nav-link>
        <go-nav-link
          block
          url="#item"
          label="List item 2"
          icon="{name: 'star'}"
          description="lorem ipsum"></go-nav-link>
      </go-nav-list>
      <go-nav-link block url="#item" label="Item 3" icon="{name: 'star'}" description="lorem ipsum"></go-nav-link>
      <go-nav-link block url="#item" label="Item 4" icon="{name: 'star'}" description="lorem ipsum"></go-nav-link>
      <go-nav-link block url="#item" label="Item 5" icon="{name: 'star'}" description="lorem ipsum"></go-nav-link>
    </go-nav-submenu>
  </go-nav-item>
</go-nav-bar>
