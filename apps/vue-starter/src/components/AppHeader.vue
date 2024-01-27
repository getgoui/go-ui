<template>
  <GoMainNav .items="items" />
</template>

<script setup>
import { GoHeaderBar, GoMainNav } from '@go-ui/vue';

const items = [
  {
    label: 'Components',
    url: '#',
    icon: 'widgets',
    description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
    children: [
      {
        label: 'Sub menu 1',
        url: '#submenu',
        icon: 'text_fields',
      },
      {
        label: 'Colors',
        url: '#',
        icon: 'color_lens',
      },
      {
        label: 'Icons',
        url: '#',
        icon: 'image',
      },
      {
        label: 'Buttons',
        url: '#',
        icon: 'touch_app',
      },
    ],
  },
  {
    label: 'Styleguide',
    url: '#',
    icon: 'style',
    children: [
      {
        label: 'Typography',
        url: '#',
        icon: 'text_fields',
        children: [
          {
            label: 'Headings',
            url: '#',
            icon: 'text_fields',
            children: [
              {
                label: 'Heading 1',
                url: '#',
              },
              {
                label: 'Heading 2',
                url: '#',
              },
            ],
          },
          {
            label: 'Paragraphs',
            url: '#',
            icon: 'text_fields',
          },
          {
            label: 'Lists',
            url: '#',
            icon: 'text_fields',
          },
          {
            label: 'Code',
            url: '#',
            icon: 'text_fields',
          },
          {
            label: 'Tables',
            url: '#',
            icon: 'text_fields',
          },
        ],
      },
      {
        label: 'Colors',
        url: '#',
        icon: 'color_lens',
        children: [
          {
            label: 'Primary',
            url: '#',
            icon: 'color_lens',
          },
        ],
      },
      {
        label: 'Icons',
        url: '#',
        icon: 'image',
      },
      {
        label: 'Buttons',
        url: '#',
        icon: 'touch_app',
      },
      {
        label: 'Forms',
        url: '#',
        icon: 'text_fields',
      },
    ],
  },
  {
    label: 'About',
    url: '#',
    icon: 'info',
  },
];
</script>
