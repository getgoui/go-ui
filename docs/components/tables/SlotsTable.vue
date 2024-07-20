<template>
  <section v-if="hasContent">
    <h3>Slots</h3>
    <div v-for="(slots, tag) in docs" :key="`${tag}-slots`">
      <h4 :id="`${tag}-slots`">
        <code class="text-size-1">{{ tag }}</code>
      </h4>
      <GoTableWrapper striped hoverable bordered full-width>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in slots" :key="slot.name">
              <td>
                <code>
                  <b>{{ slot.name }}</b>
                </code>
              </td>
              <td>
                <GoMd :content="slot.docs"></GoMd>
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
import { JsonDocsSlot } from '@go-ui/core/docs/go-ui';
import { useCompApi } from './useCompApi';
const props = defineProps({
  docs: {
    type: Object as PropType<{ [tag: string]: JsonDocsSlot[] }>,
    required: true,
  },
});
const { hasContent } = useCompApi(props.docs);
</script>
