<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<div class="container">
  <h3>List with heading link</h3>
  <go-nav-list
    heading-item="{
    label: 'List heading',
  }"
    items="[
          {
            label: 'Dashboard',
            url: '#',
            icon: 'dashboard',
          },
          {
            label: 'Forms',
            url: '#',
            icon: 'text_fields',
          },
          {
            label: 'Tables',
            url: '#',
            icon: 'grid_on',
          },
          {
            label: 'Charts',
            url: '#',
            icon: 'insert_chart',
          },
          {
            label: 'User profile',
            url: '#',
            icon: 'person',
          },
        ]"
  ></go-nav-list>
</div>
