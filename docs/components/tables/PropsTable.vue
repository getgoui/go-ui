<template>
  <section v-if="hasContent">
    <h3>Props</h3>
    <div v-for="(props, tag) in docs" :key="`${tag}-props`">
      <h4 :id="`${tag}-props`">
        <code class="text-size-1">{{ tag }}</code>
      </h4>
      <GoTableWrapper striped hoverable bordered full-width>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Attribute</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in props" :key="prop.name">
              <td>
                <code>
                  <b>{{ prop.name }}</b>
                </code>
              </td>
              <td>
                <code>{{ prop.attr }}</code>
              </td>
              <td>
                <code>{{ prop.type }}</code>
              </td>
              <td>
                <GoMd :content="prop.docs"></GoMd>
              </td>
              <td>
                <code v-if="prop?.default">{{ prop.default }}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </GoTableWrapper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { GoMd, GoTableWrapper } from '@go-ui/vue';
import { JsonDocsProp } from '@go-ui/core/docs/go-ui';
import { useCompApi } from './useCompApi';
const props = defineProps({
  docs: {
    type: Object as PropType<{ [tag: string]: JsonDocsProp[] }>,
    required: true,
  },
});
const { hasContent } = useCompApi(props.docs);
</script>
