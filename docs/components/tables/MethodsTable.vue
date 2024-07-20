<template>
  <section v-if="hasContent">
    <h3>Methods</h3>
    <div v-for="(methods, tag) in docs" :key="`${tag}-methods`">
      <h4 :id="`${tag}-methods`">
        <code class="text-size-1">{{ tag }}</code>
      </h4>
      <GoTableWrapper striped hoverable bordered full-width>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Signature</th>
              <th>Parameter</th>
              <th>Return type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in methods" :key="method.name">
              <td>
                <code>
                  <strong>{{ method.name }}</strong>
                </code>
              </td>
              <td>
                <GoMd :content="method.docs"></GoMd>
              </td>
              <td>
                <code>{{ method.signature }}</code>
              </td>
              <td>
                <dl>
                  <dt v-for="param in method.parameters" :key="param.name">
                    <code>{{ param.name }}</code>
                  </dt>
                  <dd v-for="param in method.parameters" :key="param.name">
                    <code>{{ param.type }}</code>
                  </dd>
                </dl>
              </td>
              <td>
                <code>{{ method.returns.type }}</code>
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
import { JsonDocsMethod } from '@go-ui/core/docs/go-ui';
import { useCompApi } from './useCompApi';
const props = defineProps({
  docs: {
    type: Object as PropType<{ [tag: string]: JsonDocsMethod[] }>,
    required: true,
  },
});
const { hasContent } = useCompApi(props.docs);
</script>
