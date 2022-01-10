import { Component, h } from '@stencil/core';

@Component({
  tag: 'dev-demo',
  styleUrl: 'dev-demo.scss',
  shadow: false,
})
export class DevDemo {
  navEl: HTMLGoNavDrawerElement;
  navElRight: HTMLGoNavDrawerElement;

  handleClick() {
    this.navEl.toggle();
  }
  handleClick2() {
    this.navElRight.toggle();
  }

  render() {
    const items = [
      {
        label: 'Home',
        url: '/',
        icon: 'home',
      },
      {
        label: 'Components',
        url: '/components',
        icon: 'view_module',
      },
      {
        label: 'Styleguide',
        url: '/styleguide',
        icon: 'style',
        isCurrent: true,
        children: [
          {
            label: 'Typography',
            url: '/styleguide/typography',
            icon: 'text_fields',
            children: [
              {
                label: 'Headings',
                url: '/styleguide/typography/headings',
                icon: 'text_fields',
                children: [
                  {
                    label: 'Heading 1',
                    url: '/styleguide/typography/headings/heading-1',
                  },
                  {
                    label: 'Heading 2',
                    url: '/styleguide/typography/headings/heading-2',
                  },
                ],
              },
              {
                label: 'Paragraphs',
                url: '/styleguide/typography/paragraphs',
                icon: 'text_fields',
              },
              {
                label: 'Lists',
                url: '/styleguide/typography/lists',
                icon: 'text_fields',
              },
            ],
          },
          {
            label: 'Colors',
            url: '/styleguide/colors',
            icon: 'color_lens',
          },
          {
            label: 'Icons',
            url: '/styleguide/icons',
            icon: 'image',
          },
          {
            label: 'Buttons',
            url: '/styleguide/buttons',
            icon: 'touch_app',
          },
        ],
      },
      {
        label: 'About',
        url: '/about',
        icon: 'info',
      },
    ];

    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <go-button onClick={() => this.handleClick()}>Open left</go-button>
          </div>
          <div class="col">
            <go-button onClick={() => this.handleClick2()}>Open right</go-button>
          </div>
        </div>

        <go-nav-drawer ref={(el) => (this.navEl = el)} items={items}></go-nav-drawer>
        <go-nav-drawer ref={(el) => (this.navElRight = el)} position="right" items={items}></go-nav-drawer>
      </div>
    );
  }
}
