<template>
  <section v-if="hasContent">
    <h3>Events</h3>
    <pre>{{ docs }}</pre>
    <div v-for="(events, tag) in docs" :key="`${tag}-events`">
      <h4 :id="`${tag}-events`">
        <code class="text-size-1">{{ tag }}</code>
      </h4>
      <GoTableWrapper striped hoverable bordered full-width>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Detail</th>
              <th>Bubbles</th>
              <th>Cancelable</th>
              <th>Composed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.event">
              <td>
                <code>
                  <strong>{{ event.event }}</strong>
                </code>
              </td>
              <td>
                <GoMd :content="event.docs"></GoMd>
              </td>
              <td>
                <code>{{ event.detail }}</code>
              </td>
              <td>
                <code>{{ event.bubbles }}</code>
              </td>
              <td>
                <code>{{ event.cancelable }}</code>
              </td>
              <td>
                <code>{{ event.composed }}</code>
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
import { JsonDocsEvent } from '@go-ui/core/docs/go-ui';
import { useCompApi } from './useCompApi';
const props = defineProps({
  docs: {
    type: Object as PropType<{ [tag: string]: JsonDocsEvent[] }>,
    required: true,
  },
});
const { hasContent } = useCompApi(props.docs);
</script>
