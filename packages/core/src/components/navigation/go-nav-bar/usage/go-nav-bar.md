<go-nav-bar id="navbar1"></go-nav-bar>

<script>
  const navItems = [
    {
      label: 'Home',
      url: '#home',
      icon: 'home',
    },
    {
      label: 'Components',
      url: '#components',
      icon: 'view_module',
      description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
      columns: 2,
      children: [
        {
          label: 'Sub menu 1',
          url: '#submenu1',
          icon: 'text_fields',
          description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
        },
        {
          label: 'Colors',
          url: '#colors',
          icon: 'color_lens',
        },
        {
          label: 'Icons',
          url: '#icons',
          icon: 'image',
        },
        {
          label: 'Buttons',
          url: '#buttons',
          icon: 'touch_app',
        },
      ],
    },
    {
      label: 'Styleguide',
      url: '#styleguide',
      icon: 'style',
      columns: 3,
      description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
      children: [
        {
          label: 'Typography',
          url: '#typography',
          icon: 'text_fields',
          children: [
            {
              label: 'Headings',
              url: '#headings',
              icon: 'text_fields',
              children: [
                {
                  label: 'Heading 1',
                  url: '#h1',
                },
                {
                  label: 'Heading 2',
                  url: '#h2',
                },
              ],
            },
            {
              label: 'Paragraphs',
              url: '#paragraphs',
              icon: 'text_fields',
            },
            {
              label: 'Lists',
              url: '#lists',
              icon: 'text_fields',
            },
            {
              label: 'Code',
              url: '#code',
              icon: 'text_fields',
            },
            {
              label: 'Tables',
              url: '#tables',
              icon: 'text_fields',
            },
          ],
        },
        {
          label: 'Colors',
          url: '#colors2',
          icon: 'color_lens',
          description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
          children: [
            {
              label: 'Primary',
              url: '#primary',
              icon: 'color_lens',
            },
          ],
        },
        {
          label: 'Icons',
          url: '#icons2',
          icon: 'image',
          description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
        },
        {
          label: 'Buttons',
          url: '#buttons2',
          icon: 'touch_app',
        },
        {
          label: 'Forms',
          url: '#forms',
          icon: 'text_fields',
        },
      ],
    },
    {
      label: 'About',
      url: '#about',
      icon: 'info',
    },
  ];
  navbar1.items = navItems;

  const setCurrentItem = (item, newCurrent) => {
    if (item.label === 'Colors') {
      console.log({ item, newCurrent });
    }
    let isCurrent = undefined;
    if (item.url === newCurrent.url) {
      console.log('item === newCurrent', item, newCurrent);
      isCurrent = true;
    }
    const children = item?.children?.map((child) => setCurrentItem(child, newCurrent));
    return {
      ...item,
      isCurrent,
      children,
    };
  };

  navbar1.addEventListener('navigate', (e) => {
    console.log('nav event', e.detail);
    const newCurrent = e.detail?.item;
    if (!newCurrent) {
      return;
    }
    navbar1.items = navItems.map((item) => setCurrentItem(item, newCurrent));
  });
</script>
